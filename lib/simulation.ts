// lib/simulation.ts
// Chaos Engine v3 — Fix alternatives, event logging, expanded CRM

export type ChaosLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type ImpactLabel = 'High Impact' | 'Medium Impact' | 'Low Impact';

export interface SimulationState {
    id: string;
    api_health: 'healthy' | 'degraded';
    cdn_status: 'healthy' | 'broken';
    db_latency: number;
    webhook_valid: boolean;
    cache_fresh: boolean;
    active_chaos: string[];
    updated_at: string;
}

export const DEFAULT_SIM_STATE: SimulationState = {
    id: 'singleton',
    api_health: 'healthy',
    cdn_status: 'healthy',
    db_latency: 0,
    webhook_valid: true,
    cache_fresh: true,
    active_chaos: [],
    updated_at: new Date().toISOString(),
};

export interface AlternativeFix {
    label: string;
    action: string;
    confidence: number; // 0-100
}

export interface ChaosEvent {
    id: string;
    label: string;
    description: string;
    level: ChaosLevel;
    impactLabel: ImpactLabel;
    icon: string;
    mutations: Partial<SimulationState>;
    incident: {
        source: string;
        severity: 'critical' | 'warning' | 'info';
    };
    healAction: string;
    healLabel: string;
    alternativeFixes: AlternativeFix[];
}

// ═══════════════════════════════════════════════════════════════
// HIGH IMPACT EVENTS (7)
// ═══════════════════════════════════════════════════════════════
export const HIGH_IMPACT_EVENTS: ChaosEvent[] = [
    {
        id: 'DB_CONN_EXHAUSTION',
        label: 'Database Connection Pool Exhausted',
        description: 'All PostgreSQL connections consumed. Site-wide 500 errors.',
        level: 'HIGH', impactLabel: 'High Impact', icon: '🔴',
        mutations: { api_health: 'degraded', cdn_status: 'broken', db_latency: 5000 },
        incident: { source: 'PostgreSQL Connection Pool Exhaustion', severity: 'critical' },
        healAction: 'scale_workload', healLabel: 'Kill Noisy Neighbors & Scale Pool',
        alternativeFixes: [
            { label: 'Kill Noisy Neighbors & Scale Pool', action: 'scale_workload', confidence: 94 },
            { label: 'Rolling Restart All DB Pods', action: 'restart_pods', confidence: 78 },
            { label: 'Enable PgBouncer Connection Pooling', action: 'enable_pgbouncer', confidence: 71 },
            { label: 'Failover to Read Replica', action: 'failover_replica', confidence: 55 },
        ],
    },
    {
        id: 'FULL_DISK_PRIMARY_DB',
        label: 'Primary Database Disk Full',
        description: 'WAL logs filled disk on primary. Writes halted.',
        level: 'HIGH', impactLabel: 'High Impact', icon: '🔴',
        mutations: { api_health: 'degraded', db_latency: 5000 },
        incident: { source: 'pg_wal: Disk 100% Utilized (Primary)', severity: 'critical' },
        healAction: 'scale_workload', healLabel: 'Purge WAL & Expand Volume',
        alternativeFixes: [
            { label: 'Purge WAL & Expand Volume', action: 'scale_workload', confidence: 92 },
            { label: 'Archive WAL to S3 & Truncate', action: 'archive_wal', confidence: 84 },
            { label: 'Failover to Standby (Data Loss Risk)', action: 'failover_standby', confidence: 60 },
            { label: 'Emergency Disk Resize (Downtime)', action: 'resize_disk', confidence: 45 },
        ],
    },
    {
        id: 'AUTH_SERVICE_DOWN',
        label: 'Authentication Service Failure',
        description: 'Auth service crashed. No user can login or checkout.',
        level: 'HIGH', impactLabel: 'High Impact', icon: '🔴',
        mutations: { api_health: 'degraded', webhook_valid: false },
        incident: { source: 'Auth Service OOM Kill (pod/auth-0)', severity: 'critical' },
        healAction: 'scale_workload', healLabel: 'Restart Auth Pods & Clear Sessions',
        alternativeFixes: [
            { label: 'Restart Auth Pods & Clear Sessions', action: 'scale_workload', confidence: 91 },
            { label: 'Switch to JWT Fallback Auth', action: 'jwt_fallback', confidence: 76 },
            { label: 'Enable Guest Checkout Mode', action: 'guest_mode', confidence: 68 },
            { label: 'Route to Auth0 Backup Provider', action: 'auth0_backup', confidence: 52 },
        ],
    },
    {
        id: 'CDN_ORIGIN_FAILURE',
        label: 'CDN Origin Server Unreachable',
        description: 'CDN cannot reach origin. All static assets return 502.',
        level: 'HIGH', impactLabel: 'High Impact', icon: '🔴',
        mutations: { cdn_status: 'broken', api_health: 'degraded' },
        incident: { source: 'Cloudflare: Origin 502 (all PoPs)', severity: 'critical' },
        healAction: 'scale_workload', healLabel: 'Failover to Secondary Origin',
        alternativeFixes: [
            { label: 'Failover to Secondary Origin', action: 'scale_workload', confidence: 93 },
            { label: 'Serve Stale Cache (Accept Staleness)', action: 'serve_stale', confidence: 80 },
            { label: 'Switch DNS to Backup CDN', action: 'switch_cdn', confidence: 65 },
            { label: 'Enable S3 Static Hosting Fallback', action: 's3_fallback', confidence: 48 },
        ],
    },
    {
        id: 'K8S_NODE_CRASH',
        label: 'Kubernetes Node NotReady',
        description: 'Worker node crashed. 40% of pods evicted mid-request.',
        level: 'HIGH', impactLabel: 'High Impact', icon: '🔴',
        mutations: { api_health: 'degraded', cdn_status: 'broken', db_latency: 5000 },
        incident: { source: 'k8s: node/worker-3 NotReady (OOM)', severity: 'critical' },
        healAction: 'scale_workload', healLabel: 'Cordon Node & Reschedule Pods',
        alternativeFixes: [
            { label: 'Cordon Node & Reschedule Pods', action: 'scale_workload', confidence: 95 },
            { label: 'Scale Up Node Pool (Add Worker)', action: 'scale_nodepool', confidence: 82 },
            { label: 'Force Drain & Reboot Node', action: 'drain_reboot', confidence: 70 },
            { label: 'Enable Spot Instance Replacement', action: 'spot_replace', confidence: 58 },
        ],
    },
    {
        id: 'DNS_PROPAGATION_FAIL',
        label: 'DNS Resolution Failure',
        description: 'CNAME records stale after migration. 30% of requests misrouted.',
        level: 'HIGH', impactLabel: 'High Impact', icon: '🔴',
        mutations: { api_health: 'degraded', webhook_valid: false },
        incident: { source: 'Route53: CNAME TTL Expired (api.solesource.com)', severity: 'critical' },
        healAction: 'scale_workload', healLabel: 'Force DNS Flush & Update Records',
        alternativeFixes: [
            { label: 'Force DNS Flush & Update Records', action: 'scale_workload', confidence: 90 },
            { label: 'Reduce TTL & Propagate Changes', action: 'reduce_ttl', confidence: 75 },
            { label: 'Switch to Cloudflare DNS Proxy', action: 'cf_proxy', confidence: 62 },
            { label: 'Hardcode IP in Load Balancer', action: 'hardcode_ip', confidence: 40 },
        ],
    },
    {
        id: 'RANSOMWARE_ENCRYPT',
        label: 'Ransomware: Storage Encryption Detected',
        description: 'Anomalous encryption activity on object storage. Lockdown initiated.',
        level: 'HIGH', impactLabel: 'High Impact', icon: '🔴',
        mutations: { api_health: 'degraded', cdn_status: 'broken', db_latency: 5000, cache_fresh: false },
        incident: { source: 'GuardDuty: CryptoActivity on s3://solesource-assets', severity: 'critical' },
        healAction: 'scale_workload', healLabel: 'Isolate Bucket & Restore from Snapshot',
        alternativeFixes: [
            { label: 'Isolate Bucket & Restore from Snapshot', action: 'scale_workload', confidence: 96 },
            { label: 'Revoke All IAM Keys & Rotate', action: 'revoke_iam', confidence: 88 },
            { label: 'Enable Versioning & Roll Back', action: 'version_rollback', confidence: 72 },
            { label: 'Switch to Backup Storage Region', action: 'region_failover', confidence: 50 },
        ],
    },
];

// ═══════════════════════════════════════════════════════════════
// MEDIUM IMPACT EVENTS (10)
// ═══════════════════════════════════════════════════════════════
export const MEDIUM_IMPACT_EVENTS: ChaosEvent[] = [
    {
        id: 'PAYMENT_WEBHOOK_TIMEOUT',
        label: 'Payment Webhook Timeout',
        description: 'Stripe webhook worker unresponsive. Payments accepted but unconfirmed.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { webhook_valid: false },
        incident: { source: 'Stripe Webhook: 504 Gateway Timeout', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Restart Webhook Worker',
        alternativeFixes: [
            { label: 'Restart Webhook Worker', action: 'throttle_jobs', confidence: 88 },
            { label: 'Scale Webhook Consumer Pods', action: 'scale_consumers', confidence: 74 },
            { label: 'Switch to Polling Mode', action: 'polling_mode', confidence: 55 },
        ],
    },
    {
        id: 'SEARCH_INDEX_STALE',
        label: 'Search Index Desynchronized',
        description: 'Elasticsearch replica 1h behind. Search returns outdated products.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { cache_fresh: false },
        incident: { source: 'Elasticsearch: Replica Lag > 3600s', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Force Index Rebuild',
        alternativeFixes: [
            { label: 'Force Index Rebuild', action: 'throttle_jobs', confidence: 90 },
            { label: 'Switch to Primary Shard Only', action: 'primary_shard', confidence: 72 },
            { label: 'Fallback to DB Full-Text Search', action: 'db_search', confidence: 50 },
        ],
    },
    {
        id: 'RATE_LIMIT_SPIKE',
        label: 'API Rate Limit Exceeded',
        description: 'Bot traffic triggered rate limiter. 15% of legit requests blocked.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { api_health: 'degraded' },
        incident: { source: 'WAF: Rate Limit Triggered (1200 rps)', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Adjust Rate Limits & Block Bot IPs',
        alternativeFixes: [
            { label: 'Adjust Rate Limits & Block Bot IPs', action: 'throttle_jobs', confidence: 87 },
            { label: 'Enable CAPTCHA Challenge', action: 'captcha', confidence: 73 },
            { label: 'Increase Rate Limit Threshold', action: 'increase_limit', confidence: 60 },
        ],
    },
    {
        id: 'CERT_EXPIRY_WARNING',
        label: 'SSL Certificate Expiring',
        description: 'TLS cert expires in 2 hours. Mixed content warnings appearing.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { webhook_valid: false },
        incident: { source: 'ACM: Certificate Expiry Warning (2h)', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Renew & Deploy Certificate',
        alternativeFixes: [
            { label: 'Renew & Deploy Certificate', action: 'throttle_jobs', confidence: 95 },
            { label: 'Switch to Let\'s Encrypt Auto-Renew', action: 'lets_encrypt', confidence: 80 },
            { label: 'Use Cloudflare Universal SSL', action: 'cf_ssl', confidence: 65 },
        ],
    },
    {
        id: 'QUEUE_BACKLOG',
        label: 'Order Queue Backlog',
        description: 'SQS queue depth at 15,000. Order confirmations delayed 20+ minutes.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { webhook_valid: false },
        incident: { source: 'SQS: Queue Depth > 15000 (orders-process)', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Scale Queue Consumers',
        alternativeFixes: [
            { label: 'Scale Queue Consumers', action: 'throttle_jobs', confidence: 89 },
            { label: 'Enable Batch Processing Mode', action: 'batch_mode', confidence: 75 },
            { label: 'Purge Stale Messages & Retry', action: 'purge_retry', confidence: 58 },
        ],
    },
    {
        id: 'MEMORY_LEAK_API',
        label: 'API Server Memory Leak',
        description: 'Heap usage at 92%. GC pauses causing 2s latency spikes.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { api_health: 'degraded' },
        incident: { source: 'Node.js: Heap > 1.8GB (api-server-pod-2)', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Rolling Restart API Pods',
        alternativeFixes: [
            { label: 'Rolling Restart API Pods', action: 'throttle_jobs', confidence: 91 },
            { label: 'Force GC & Increase Heap Limit', action: 'force_gc', confidence: 70 },
            { label: 'Deploy Hotfix (Memory Patch)', action: 'hotfix_deploy', confidence: 55 },
        ],
    },
    {
        id: 'CDN_CACHE_PURGE_FAIL',
        label: 'CDN Cache Purge Stuck',
        description: 'Product images showing old versions. Purge queue jammed.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { cache_fresh: false },
        incident: { source: 'Cloudflare: Purge Queue Depth > 500', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Force Full Cache Invalidation',
        alternativeFixes: [
            { label: 'Force Full Cache Invalidation', action: 'throttle_jobs', confidence: 86 },
            { label: 'Add Cache-Busting Query Params', action: 'cache_bust', confidence: 72 },
            { label: 'Switch to Versioned URLs', action: 'version_urls', confidence: 60 },
        ],
    },
    {
        id: 'THIRD_PARTY_SHIPPING_API',
        label: 'Shipping API Degraded',
        description: 'FedEx API returning 503. Shipping estimates unavailable.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { webhook_valid: false },
        incident: { source: 'FedEx API: 503 Service Unavailable', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Switch to UPS Fallback',
        alternativeFixes: [
            { label: 'Switch to UPS Fallback', action: 'throttle_jobs', confidence: 88 },
            { label: 'Show Estimated Ranges Instead', action: 'estimate_ranges', confidence: 74 },
            { label: 'Cache Last Known Rates', action: 'cache_rates', confidence: 60 },
        ],
    },
    {
        id: 'SESSION_STORE_FULL',
        label: 'Session Store Near Capacity',
        description: 'Redis session store at 95%. New sessions may fail.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { cache_fresh: false, api_health: 'degraded' },
        incident: { source: 'Redis: Memory > 95% (session-store)', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Evict Stale Sessions & Scale',
        alternativeFixes: [
            { label: 'Evict Stale Sessions & Scale', action: 'throttle_jobs', confidence: 90 },
            { label: 'Switch to JWT Stateless Sessions', action: 'jwt_sessions', confidence: 75 },
            { label: 'Increase Redis maxmemory', action: 'increase_memory', confidence: 62 },
        ],
    },
    {
        id: 'DB_REPLICATION_LAG',
        label: 'Database Replication Lag',
        description: 'Read replica 45s behind primary. Stale inventory counts.',
        level: 'MEDIUM', impactLabel: 'Medium Impact', icon: '🟠',
        mutations: { cache_fresh: false },
        incident: { source: 'PostgreSQL: Replica Lag > 45s', severity: 'warning' },
        healAction: 'throttle_jobs', healLabel: 'Rebuild Replication Slot',
        alternativeFixes: [
            { label: 'Rebuild Replication Slot', action: 'throttle_jobs', confidence: 87 },
            { label: 'Route Reads to Primary (Temporary)', action: 'route_primary', confidence: 72 },
            { label: 'Restart Replica & Resync', action: 'restart_replica', confidence: 58 },
        ],
    },
];

// ═══════════════════════════════════════════════════════════════
// LOW IMPACT EVENTS (10)
// ═══════════════════════════════════════════════════════════════
export const LOW_IMPACT_EVENTS: ChaosEvent[] = [
    {
        id: 'REDIS_CACHE_STALE',
        label: 'Product Price Cache Stale',
        description: 'Redis cache serving stale data. Prices show as $0.00.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: { cache_fresh: false },
        incident: { source: 'Redis OOM: Cache Eviction Failure', severity: 'warning' },
        healAction: 'get_metrics', healLabel: 'Flush Redis Cache',
        alternativeFixes: [
            { label: 'Flush Redis Cache', action: 'get_metrics', confidence: 92 },
            { label: 'Set Lower TTL on Price Keys', action: 'lower_ttl', confidence: 78 },
        ],
    },
    {
        id: 'LOG_PIPELINE_DELAY',
        label: 'Logging Pipeline Delayed',
        description: 'Datadog log forwarding 5m behind. Dashboards stale.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: {},
        incident: { source: 'Datadog Agent: Queue Depth > 10000', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Flush Log Buffer',
        alternativeFixes: [
            { label: 'Flush Log Buffer', action: 'get_metrics', confidence: 88 },
            { label: 'Restart Datadog Agent', action: 'restart_agent', confidence: 72 },
        ],
    },
    {
        id: 'STATIC_ASSET_404',
        label: 'Missing Static Asset',
        description: 'New font file not deployed. Fallback font rendering.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: {},
        incident: { source: 'S3: 404 on /fonts/SoleSource-Bold.woff2', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Redeploy Static Bundle',
        alternativeFixes: [
            { label: 'Redeploy Static Bundle', action: 'get_metrics', confidence: 90 },
            { label: 'Upload Missing Asset Manually', action: 'manual_upload', confidence: 75 },
        ],
    },
    {
        id: 'HEALTH_CHECK_FLAP',
        label: 'Health Check Flapping',
        description: 'ALB health check toggling healthy/unhealthy every 30s.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: {},
        incident: { source: 'ALB: Target Flapping (api-server-3)', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Increase Health Check Interval',
        alternativeFixes: [
            { label: 'Increase Health Check Interval', action: 'get_metrics', confidence: 85 },
            { label: 'Fix Health Endpoint Response Time', action: 'fix_health_ep', confidence: 70 },
        ],
    },
    {
        id: 'THUMBNAIL_GENERATION',
        label: 'Thumbnail Queue Slow',
        description: 'Image processing lambda cold-starting. Thumbnails delayed 8s.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: { cache_fresh: false },
        incident: { source: 'Lambda: Cold Start > 5s (img-resize)', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Pre-warm Lambda Functions',
        alternativeFixes: [
            { label: 'Pre-warm Lambda Functions', action: 'get_metrics', confidence: 87 },
            { label: 'Switch to Provisioned Concurrency', action: 'provisioned', confidence: 78 },
        ],
    },
    {
        id: 'ANALYTICS_DROP',
        label: 'Analytics Events Dropping',
        description: 'Segment destination rejecting 3% of events. Tracking gaps.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: {},
        incident: { source: 'Segment: Delivery Rate 97% (below SLA)', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Retry Failed Events',
        alternativeFixes: [
            { label: 'Retry Failed Events', action: 'get_metrics', confidence: 84 },
            { label: 'Switch to Direct API Integration', action: 'direct_api', confidence: 68 },
        ],
    },
    {
        id: 'EMAIL_QUEUE_SLOW',
        label: 'Email Delivery Slow',
        description: 'SendGrid rate limited. Order confirmation emails delayed 5m.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: {},
        incident: { source: 'SendGrid: Rate Limited (429)', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Switch to SES Fallback',
        alternativeFixes: [
            { label: 'Switch to SES Fallback', action: 'get_metrics', confidence: 86 },
            { label: 'Throttle Email Send Rate', action: 'throttle_email', confidence: 70 },
        ],
    },
    {
        id: 'SITEMAP_OUTDATED',
        label: 'Sitemap Not Updated',
        description: 'Last sitemap generation 48h ago. New products missing from SEO.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: {},
        incident: { source: 'Cron: sitemap-gen missed 2 cycles', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Trigger Sitemap Rebuild',
        alternativeFixes: [
            { label: 'Trigger Sitemap Rebuild', action: 'get_metrics', confidence: 92 },
            { label: 'Submit URLs via Search Console', action: 'search_console', confidence: 74 },
        ],
    },
    {
        id: 'INVENTORY_SYNC_LAG',
        label: 'Inventory Sync Behind',
        description: 'Warehouse API sync 10m late. Stock counts may be inaccurate.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: { cache_fresh: false },
        incident: { source: 'Warehouse API: Sync Lag 10m', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Force Inventory Sync',
        alternativeFixes: [
            { label: 'Force Inventory Sync', action: 'get_metrics', confidence: 89 },
            { label: 'Show "Limited Stock" Warning', action: 'limited_stock', confidence: 65 },
        ],
    },
    {
        id: 'BROWSER_CONSOLE_ERRORS',
        label: 'Client-Side JS Errors Spiking',
        description: 'Sentry reporting 200+ JS errors/min. Mostly IE11 users.',
        level: 'LOW', impactLabel: 'Low Impact', icon: '🔵',
        mutations: {},
        incident: { source: 'Sentry: Error Rate > 200/min', severity: 'info' },
        healAction: 'get_metrics', healLabel: 'Deploy Polyfill Bundle',
        alternativeFixes: [
            { label: 'Deploy Polyfill Bundle', action: 'get_metrics', confidence: 83 },
            { label: 'Drop IE11 Support & Show Banner', action: 'drop_ie11', confidence: 70 },
        ],
    },
];

// Helper to get a random event from a pool, excluding already active ones
export function getRandomEvent(level: ChaosLevel, activeIds: string[]): ChaosEvent | null {
    const pool = level === 'HIGH' ? HIGH_IMPACT_EVENTS
        : level === 'MEDIUM' ? MEDIUM_IMPACT_EVENTS
            : LOW_IMPACT_EVENTS;
    const available = pool.filter(e => !activeIds.includes(e.id));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
}

// Get event by ID from any pool
export function getEventById(id: string): ChaosEvent | undefined {
    return [...HIGH_IMPACT_EVENTS, ...MEDIUM_IMPACT_EVENTS, ...LOW_IMPACT_EVENTS].find(e => e.id === id);
}

// Get the level of an event by ID
export function getEventLevel(id: string): ChaosLevel | null {
    const event = getEventById(id);
    return event?.level ?? null;
}

// Legacy compat
export const CHAOS_PAYLOADS: Record<ChaosLevel, ChaosEvent> = {
    HIGH: HIGH_IMPACT_EVENTS[0],
    MEDIUM: MEDIUM_IMPACT_EVENTS[0],
    LOW: LOW_IMPACT_EVENTS[0],
};

// ═══════════════════════════════════════════════════════════════
// CUSTOMER SENTIMENTS
// ═══════════════════════════════════════════════════════════════
export const CUSTOMER_SENTIMENTS = {
    angry: [
        { msg: "I can't check out! This site is trash!", emoji: '😡' },
        { msg: 'Payment failed AGAIN. Going to a competitor.', emoji: '🤬' },
        { msg: 'Why are all prices showing $0.00??', emoji: '😤' },
        { msg: 'Site is completely down. Unacceptable!', emoji: '💀' },
        { msg: "Where is my order confirmation??", emoji: '😡' },
        { msg: "Images won't load. Is this site from 2005?", emoji: '🙄' },
        { msg: 'Been trying to buy for 20 minutes...', emoji: '😤' },
        { msg: 'Cart keeps spinning forever. Fix your site!', emoji: '🤬' },
    ],
    happy: [
        { msg: 'Just copped the new drops, smooth as butter!', emoji: '😍' },
        { msg: 'Checkout was instant. Love this store!', emoji: '🔥' },
        { msg: 'Best sneaker site, period.', emoji: '❤️' },
        { msg: 'Got my confirmation email in seconds', emoji: '✅' },
        { msg: 'These prices are right! Grabbing two pairs', emoji: '🛒' },
        { msg: 'Site is buttery smooth today', emoji: '💯' },
        { msg: 'Cart to checkout in 3 seconds flat', emoji: '⚡' },
        { msg: 'Quality drops AND quality website', emoji: '🏆' },
    ],
};

// ═══════════════════════════════════════════════════════════════
// CUSTOMER SERVICE CONVERSATIONS (for CRM messenger)
// ═══════════════════════════════════════════════════════════════
export interface CustomerMessage {
    id: string;
    sender: 'customer' | 'agent';
    text: string;
    timestamp: string;
}

export interface CustomerConversation {
    id: string;
    customerName: string;
    avatar: string;
    status: 'open' | 'resolved' | 'waiting';
    priority: 'high' | 'medium' | 'low';
    lastMessage: string;
    unread: number;
    messages: CustomerMessage[];
}

function minutesAgoISO(min: number): string {
    const d = new Date();
    d.setMinutes(d.getMinutes() - min);
    return d.toISOString();
}

export function generateConversations(hasChaos: boolean): CustomerConversation[] {
    if (hasChaos) {
        return [
            {
                id: 'conv-1', customerName: 'Marcus J.', avatar: '😡', status: 'open', priority: 'high', lastMessage: 'This is unacceptable!', unread: 3,
                messages: [
                    { id: 'm1', sender: 'customer', text: 'Hey, I\'ve been trying to checkout for the last 10 minutes and nothing works.', timestamp: minutesAgoISO(8) },
                    { id: 'm2', sender: 'agent', text: 'Hi Marcus, I\'m sorry for the inconvenience. We\'re currently experiencing technical difficulties.', timestamp: minutesAgoISO(7) },
                    { id: 'm3', sender: 'customer', text: 'My cart keeps showing a spinning loader. I have $500+ worth of shoes in there!', timestamp: minutesAgoISO(5) },
                    { id: 'm4', sender: 'customer', text: 'This is unacceptable! I\'m going to Nike.com instead', timestamp: minutesAgoISO(3) },
                    { id: 'm5', sender: 'agent', text: 'I completely understand your frustration. Our engineering team is working on a fix. Your cart has been saved.', timestamp: minutesAgoISO(2) },
                ],
            },
            {
                id: 'conv-2', customerName: 'Sarah C.', avatar: '😤', status: 'open', priority: 'high', lastMessage: 'Payment keeps failing!', unread: 2,
                messages: [
                    { id: 'm6', sender: 'customer', text: 'My payment just failed 3 times in a row. Is your payment system down?', timestamp: minutesAgoISO(6) },
                    { id: 'm7', sender: 'agent', text: 'Hi Sarah, I apologize. We\'re experiencing payment processing issues right now.', timestamp: minutesAgoISO(5) },
                    { id: 'm8', sender: 'customer', text: 'I got charged twice but no order confirmation??', timestamp: minutesAgoISO(3) },
                    { id: 'm9', sender: 'customer', text: 'Payment keeps failing! I need this resolved ASAP', timestamp: minutesAgoISO(1) },
                ],
            },
            {
                id: 'conv-3', customerName: 'James P.', avatar: '🙄', status: 'open', priority: 'medium', lastMessage: 'Images aren\'t loading', unread: 1,
                messages: [
                    { id: 'm10', sender: 'customer', text: 'None of the shoe images are loading. Just seeing broken icons everywhere.', timestamp: minutesAgoISO(4) },
                    { id: 'm11', sender: 'agent', text: 'Sorry about that James. We\'re aware of an issue with our CDN. Working on it now.', timestamp: minutesAgoISO(3) },
                    { id: 'm12', sender: 'customer', text: 'How am I supposed to buy shoes I can\'t even see?', timestamp: minutesAgoISO(2) },
                ],
            },
            {
                id: 'conv-4', customerName: 'Emma R.', avatar: '😠', status: 'waiting', priority: 'medium', lastMessage: 'Where is my order?', unread: 1,
                messages: [
                    { id: 'm13', sender: 'customer', text: 'I placed an order 30 minutes ago and haven\'t received any confirmation email.', timestamp: minutesAgoISO(15) },
                    { id: 'm14', sender: 'agent', text: 'Looking into this for you now Emma.', timestamp: minutesAgoISO(12) },
                    { id: 'm15', sender: 'customer', text: 'Where is my order? I need it for a birthday gift tomorrow.', timestamp: minutesAgoISO(5) },
                ],
            },
            {
                id: 'conv-5', customerName: 'Tyler B.', avatar: '😤', status: 'open', priority: 'low', lastMessage: 'Prices showing $0.00', unread: 1,
                messages: [
                    { id: 'm16', sender: 'customer', text: 'All the prices on the site are showing as $0.00. Is this real or a glitch?', timestamp: minutesAgoISO(7) },
                    { id: 'm17', sender: 'agent', text: 'That\'s a display issue on our end. The actual prices will be correct at checkout.', timestamp: minutesAgoISO(6) },
                ],
            },
        ];
    }
    return [
        {
            id: 'conv-h1', customerName: 'Olivia K.', avatar: '😊', status: 'resolved', priority: 'low', lastMessage: 'Thank you so much!', unread: 0,
            messages: [
                { id: 'mh1', sender: 'customer', text: 'Hi! Quick question — do the Phantom X come in half sizes?', timestamp: minutesAgoISO(20) },
                { id: 'mh2', sender: 'agent', text: 'Hi Olivia! Yes, the Phantom X is available in half sizes from 7.5 to 12.5.', timestamp: minutesAgoISO(18) },
                { id: 'mh3', sender: 'customer', text: 'Perfect! Just ordered a 9.5. Thank you so much! 🎉', timestamp: minutesAgoISO(15) },
            ],
        },
        {
            id: 'conv-h2', customerName: 'Kevin O.', avatar: '👍', status: 'resolved', priority: 'low', lastMessage: 'Got it, thanks!', unread: 0,
            messages: [
                { id: 'mh4', sender: 'customer', text: 'When does the new Cloud Nine restock?', timestamp: minutesAgoISO(45) },
                { id: 'mh5', sender: 'agent', text: 'Hey Kevin! Cloud Nine Size 13 restocks next Tuesday. Want me to notify you?', timestamp: minutesAgoISO(43) },
                { id: 'mh6', sender: 'customer', text: 'Yes please! Got it, thanks!', timestamp: minutesAgoISO(40) },
            ],
        },
        {
            id: 'conv-h3', customerName: 'Diana P.', avatar: '😄', status: 'waiting', priority: 'low', lastMessage: 'Love the new collection!', unread: 0,
            messages: [
                { id: 'mh7', sender: 'customer', text: 'Just ordered 3 pairs from the new drops. When can I expect shipping?', timestamp: minutesAgoISO(30) },
                { id: 'mh8', sender: 'agent', text: 'Thanks for shopping with us Diana! All 3 pairs will ship within 24 hours.', timestamp: minutesAgoISO(28) },
                { id: 'mh9', sender: 'customer', text: 'Love the new collection! Will definitely be back', timestamp: minutesAgoISO(25) },
            ],
        },
    ];
}

// ═══════════════════════════════════════════════════════════════
// EXPANDED PRODUCT CATALOG (12 shoes)
// ═══════════════════════════════════════════════════════════════
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: 'Running' | 'Basketball' | 'Lifestyle' | 'New Drops';
    color: string;
    sizes: number[];
    inStock: boolean;
    rating: number;
    reviews: number;
}

export const PRODUCTS: Product[] = [
    { id: 'ss-001', name: 'SoleSource Phantom X', price: 249.99, image: '/shoes/hero.png', category: 'New Drops', color: 'Black / Electric Blue', sizes: [7, 8, 9, 10, 11, 12, 13], inStock: true, rating: 4.9, reviews: 342 },
    { id: 'ss-002', name: 'SoleSource Cloud Nine', price: 219.99, image: '/shoes/white.png', category: 'Basketball', color: 'White / Navy', sizes: [8, 9, 10, 11, 12], inStock: true, rating: 4.7, reviews: 218 },
    { id: 'ss-003', name: 'SoleSource Blaze Runner', price: 279.99, image: '/shoes/red.png', category: 'Lifestyle', color: 'Black / Risk Red', sizes: [7, 8, 9, 10, 11, 12], inStock: true, rating: 4.8, reviews: 156 },
    { id: 'ss-004', name: 'SoleSource Venom Glide', price: 199.99, image: '/shoes/green.png', category: 'Running', color: 'Grey / Neon Green', sizes: [8, 9, 10, 11, 12, 13], inStock: true, rating: 4.6, reviews: 289 },
    { id: 'ss-005', name: 'SoleSource Shadow Drift', price: 189.99, image: '/shoes/hero.png', category: 'Lifestyle', color: 'Triple Black', sizes: [7, 8, 9, 10, 11], inStock: true, rating: 4.5, reviews: 412 },
    { id: 'ss-006', name: 'SoleSource Apex Pro', price: 299.99, image: '/shoes/white.png', category: 'Running', color: 'White / Silver', sizes: [8, 9, 10, 11, 12], inStock: true, rating: 4.9, reviews: 87 },
    { id: 'ss-007', name: 'SoleSource Fury Max', price: 259.99, image: '/shoes/red.png', category: 'Basketball', color: 'Red / Black', sizes: [9, 10, 11, 12, 13], inStock: true, rating: 4.7, reviews: 193 },
    { id: 'ss-008', name: 'SoleSource Orbit', price: 229.99, image: '/shoes/green.png', category: 'New Drops', color: 'Green / Black', sizes: [7, 8, 9, 10, 11, 12], inStock: true, rating: 4.8, reviews: 64 },
    { id: 'ss-009', name: 'SoleSource Zenith', price: 269.99, image: '/shoes/hero.png', category: 'Running', color: 'Blue / Carbon', sizes: [8, 9, 10, 11], inStock: true, rating: 4.6, reviews: 178 },
    { id: 'ss-010', name: 'SoleSource Nomad', price: 179.99, image: '/shoes/white.png', category: 'Lifestyle', color: 'Cream / Sail', sizes: [7, 8, 9, 10, 11, 12, 13], inStock: true, rating: 4.4, reviews: 531 },
    { id: 'ss-011', name: 'SoleSource Titan II', price: 309.99, image: '/shoes/red.png', category: 'New Drops', color: 'Crimson / Gold', sizes: [8, 9, 10, 11, 12], inStock: true, rating: 4.9, reviews: 42 },
    { id: 'ss-012', name: 'SoleSource Echo', price: 209.99, image: '/shoes/green.png', category: 'Basketball', color: 'Forest / White', sizes: [9, 10, 11, 12, 13], inStock: true, rating: 4.5, reviews: 267 },
];

// ═══════════════════════════════════════════════════════════════
// MOCK CRM DATA — Orders, Customers, Payments
// ═══════════════════════════════════════════════════════════════
export type OrderStatus = 'completed' | 'processing' | 'failed' | 'refunded' | 'shipped';
export type PaymentStatus = 'succeeded' | 'failed' | 'pending' | 'refunded';

export interface MockCustomer {
    id: string; name: string; email: string; avatar: string;
    city: string; state: string; zip: string; address: string;
    totalOrders: number; ltv: number;
}

export interface MockOrder {
    id: string; customer: MockCustomer; product: Product;
    size: number; quantity: number; total: number;
    status: OrderStatus; paymentStatus: PaymentStatus;
    paymentMethod: string; createdAt: string; shippingAddress: string;
}

const MOCK_CUSTOMERS: MockCustomer[] = [
    { id: 'cust-001', name: 'Marcus Johnson', email: 'marcus.j@gmail.com', avatar: '👤', city: 'Los Angeles', state: 'CA', zip: '90012', address: '742 Evergreen Terrace', totalOrders: 8, ltv: 1840 },
    { id: 'cust-002', name: 'Sarah Chen', email: 'sarah.chen@outlook.com', avatar: '👤', city: 'New York', state: 'NY', zip: '10001', address: '350 Fifth Avenue', totalOrders: 12, ltv: 3200 },
    { id: 'cust-003', name: 'DeAndre Williams', email: 'dwilliams@icloud.com', avatar: '👤', city: 'Chicago', state: 'IL', zip: '60601', address: '233 S Wacker Dr', totalOrders: 5, ltv: 1450 },
    { id: 'cust-004', name: 'Emma Rodriguez', email: 'emma.r@yahoo.com', avatar: '👤', city: 'Miami', state: 'FL', zip: '33101', address: '1 Biscayne Blvd', totalOrders: 3, ltv: 750 },
    { id: 'cust-005', name: 'James Park', email: 'jpark@gmail.com', avatar: '👤', city: 'Seattle', state: 'WA', zip: '98101', address: '400 Broad Street', totalOrders: 15, ltv: 4100 },
    { id: 'cust-006', name: 'Aisha Mohamed', email: 'aisha.m@proton.me', avatar: '👤', city: 'Atlanta', state: 'GA', zip: '30301', address: '225 Baker St NW', totalOrders: 7, ltv: 1920 },
    { id: 'cust-007', name: 'Tyler Brooks', email: 'tbrooks@hotmail.com', avatar: '👤', city: 'Houston', state: 'TX', zip: '77001', address: '1600 Lamar St', totalOrders: 2, ltv: 480 },
    { id: 'cust-008', name: 'Olivia Kim', email: 'olivia.kim@gmail.com', avatar: '👤', city: 'San Francisco', state: 'CA', zip: '94102', address: '870 Market Street', totalOrders: 9, ltv: 2650 },
    { id: 'cust-009', name: 'Kevin O\'Brien', email: 'kob@outlook.com', avatar: '👤', city: 'Boston', state: 'MA', zip: '02101', address: '1 City Hall Sq', totalOrders: 4, ltv: 980 },
    { id: 'cust-010', name: 'Diana Patel', email: 'diana.p@gmail.com', avatar: '👤', city: 'Denver', state: 'CO', zip: '80201', address: '1144 15th Street', totalOrders: 6, ltv: 1560 },
];

const PAYMENT_METHODS = ['Visa ****4242', 'Mastercard ****8888', 'Amex ****1234', 'Apple Pay', 'Google Pay', 'PayPal'];

function randomMinutesAgo(max: number): string {
    const d = new Date();
    d.setMinutes(d.getMinutes() - Math.floor(Math.random() * max));
    return d.toISOString();
}

function generateOrder(index: number, forceStatus?: OrderStatus, forcePayment?: PaymentStatus): MockOrder {
    const customer = MOCK_CUSTOMERS[index % MOCK_CUSTOMERS.length];
    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    const size = product.sizes[Math.floor(Math.random() * product.sizes.length)];
    const qty = Math.random() > 0.8 ? 2 : 1;
    const statuses: OrderStatus[] = ['completed', 'processing', 'shipped', 'completed', 'completed'];
    const payStatuses: PaymentStatus[] = ['succeeded', 'succeeded', 'succeeded', 'pending', 'succeeded'];
    const status = forceStatus || statuses[Math.floor(Math.random() * statuses.length)];
    const payStatus = forcePayment || payStatuses[Math.floor(Math.random() * payStatuses.length)];
    return {
        id: `ORD-${String(1000 + index).padStart(5, '0')}`,
        customer, product, size, quantity: qty,
        total: +(product.price * qty * 1.08).toFixed(2),
        status, paymentStatus: payStatus,
        paymentMethod: PAYMENT_METHODS[Math.floor(Math.random() * PAYMENT_METHODS.length)],
        createdAt: randomMinutesAgo(120),
        shippingAddress: `${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}`,
    };
}

export function generateMockOrders(chaos: boolean = false): MockOrder[] {
    const orders: MockOrder[] = [];
    for (let i = 0; i < 20; i++) {
        if (chaos && Math.random() > 0.5) {
            orders.push(generateOrder(i, 'failed', 'failed'));
        } else {
            orders.push(generateOrder(i));
        }
    }
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getCRMStats(orders: MockOrder[]) {
    const total = orders.length;
    const completed = orders.filter(o => o.status === 'completed' || o.status === 'shipped').length;
    const failed = orders.filter(o => o.status === 'failed').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    const revenue = orders.filter(o => o.paymentStatus === 'succeeded').reduce((s, o) => s + o.total, 0);
    const failedPayments = orders.filter(o => o.paymentStatus === 'failed').length;
    return { total, completed, failed, processing, revenue, failedPayments };
}
