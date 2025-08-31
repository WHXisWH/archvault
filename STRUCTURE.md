# ArchVault Technical Architecture

## System Overview

ArchVault implements a multi-layered architecture that seamlessly integrates Filecoin Onchain Cloud services to provide verifiable storage, guaranteed retrieval, and transparent payment settlement for the architecture industry.

## Core Architecture Layers

### 1. Presentation Layer (Frontend)
```
Next.js Application
├── Pages (App Router)
│   ├── Dashboard
│   ├── Project Management
│   ├── Storage Browser
│   ├── Payment Center
│   └── PDP Monitor
├── Components
│   ├── File Upload/Preview
│   ├── Version Tree Visualization
│   ├── SLA Metrics Dashboard
│   └── Payment Flow UI
└── State Management
    ├── Project Context
    ├── Storage Context
    └── Payment Context
```

### 2. Application Layer (Backend Services)
```
Service Architecture
├── Storage Service
│   ├── Warm Storage Manager
│   ├── Archive Orchestrator
│   ├── Version Controller
│   └── CAR Packager
├── PDP Service
│   ├── Proof Scheduler
│   ├── Verification Monitor
│   ├── SLA Tracker
│   └── Audit Logger
├── Payment Service
│   ├── Subscription Manager
│   ├── Stream Controller
│   ├── Settlement Engine
│   └── Invoice Generator
└── CDN Service
    ├── Cache Manager
    ├── Retrieval Router
    ├── Bandwidth Monitor
    └── Edge Optimizer
```

### 3. Blockchain Integration Layer
```
Filecoin Onchain Cloud Integration
├── Synapse SDK Wrapper
│   ├── Unified API Interface
│   ├── Event Handlers
│   ├── Error Recovery
│   └── Transaction Manager
├── Smart Contract Interfaces
│   ├── FilecoinWarmStorageService
│   ├── PDPVerifier
│   ├── Payments Contract
│   └── Custom Adapters
└── Storage Provider Communication
    ├── PDP Server Interface
    ├── Deal Negotiation
    ├── Retrieval Protocol
    └── Health Monitoring
```

## Data Flow Architecture

### Upload Flow
```
Client → Chunking → Hashing → CAR Creation → Warm Storage → PDP Registration → Payment Lock
```

### Retrieval Flow
```
Request → CDN Check → Warm Layer → PDP Verify → Deliver → Payment Settlement
```

### Archive Flow
```
Milestone Trigger → PDP Proof → Deal Creation → Cold Storage → Renewal Scheduler
```

## Filecoin Service Integration Points

### 1. FilecoinWarmStorageService
- **Purpose**: Primary storage layer for active collaboration
- **Integration Method**: Direct contract calls via Synapse SDK
- **Key Operations**:
  ```typescript
  createWarmBucket(projectId, slaParams)
  putObject(carCid, size, pdpOptions)
  commitMilestone(warmCid, retention, replicas)
  ```

### 2. PDP (Proof of Data Possession)
- **Purpose**: Cryptographic proof of data availability
- **Integration Method**: PDPVerifier contract + PDPServer API
- **Key Operations**:
  ```typescript
  createProofSet(clientDataSetId, withCDN)
  addRoots(proofSetId, rootData)
  verifyProof(proofSetId, challenge)
  ```

### 3. FilCDN
- **Purpose**: Guaranteed content delivery with SLA
- **Integration Method**: CDN API + Smart contract for SLA
- **Key Features**:
  - Edge caching across regions
  - TTFB guarantees with penalties
  - Bandwidth optimization

### 4. Filecoin Pay
- **Purpose**: Multi-modal payment processing
- **Integration Method**: Payments contract via Synapse
- **Payment Modes**:
  ```typescript
  oneTimePayment(amount, recipient)
  createSubscription(plan, duration)
  streamingPayment(rate, maxDuration)
  ```

### 5. Synapse SDK
- **Purpose**: Unified interface to all Filecoin services
- **Benefits**:
  - Consistent API across services
  - Built-in error handling
  - Event subscription system
  - TypeScript support

## Storage Architecture

### Warm-Cold Tiering Strategy
```
Active Phase (0-30 days)
├── Warm Storage (FilecoinWarmStorageService)
├── High-frequency access
├── Version control active
└── Real-time collaboration

Transition Phase (30-90 days)
├── PDP proof generation
├── FilCDN cache warming
├── Payment settlement
└── Audit trail creation

Archive Phase (90+ days)
├── Filecoin Deals
├── Multi-region replication
├── Long-term preservation
└── Compliance records
```

### Version Management
```
Version Tree Structure
├── Root Version (v0)
├── Branch Points
│   ├── Major Revisions
│   └── Minor Updates
├── Frozen Milestones
│   ├── PDP Proofs
│   ├── Signatures
│   └── Payment Records
└── Archive References
    ├── Deal CIDs
    ├── Storage Providers
    └── Renewal Schedules
```

## Security Architecture

### Data Security
- Client-side encryption before upload
- Envelope encryption with project keys
- KMS integration for key management
- Zero-knowledge proofs for sensitive data

### Access Control
- Role-based permissions (Owner, Editor, Viewer)
- Time-bound access tokens
- Signed URLs for external sharing
- Audit logging of all access

### Payment Security
- Multi-signature wallets for large transactions
- Escrow mechanisms for milestone payments
- Automatic refunds for SLA violations
- Transparent on-chain settlement

## Performance Optimization

### Upload Optimization
- Rabin fingerprinting for deduplication
- Parallel chunk upload
- Progressive CAR generation
- Delta compression for versions

### Retrieval Optimization
- Multi-tier caching (Memory, SSD, Warm)
- Predictive prefetching
- Bandwidth aggregation
- Regional edge nodes

### Cost Optimization
- Automatic tier migration
- Compression before archival
- Batch Deal creation
- Provider competition for best rates

## Monitoring & Analytics

### System Metrics
- Storage utilization and growth
- Retrieval performance (TTFB, throughput)
- PDP verification success rate
- Payment flow analytics

### SLA Monitoring
- Availability tracking (99.9% target)
- Latency percentiles (P50, P95, P99)
- Proof frequency compliance
- Penalty calculations

### Business Metrics
- Project activity levels
- Storage cost per project
- Revenue by service tier
- Provider performance rankings

## Deployment Architecture

### Infrastructure
```
Production Deployment
├── Frontend (Vercel/Netlify)
├── API Services (AWS/GCP)
├── IPFS Nodes (Dedicated)
├── Database (PostgreSQL)
├── Cache (Redis)
└── Monitoring (Grafana/Prometheus)
```

### Network Configuration
- Filecoin Mainnet for production
- Calibnet for testing
- Local devnet for development
- Multi-region deployment for resilience

## Integration Patterns

### Event-Driven Architecture
```typescript
synapse.on('proofVerified', handleProofVerified)
synapse.on('paymentSettled', handlePaymentSettled)
synapse.on('slaViolation', handleSLAViolation)
```

### Retry Mechanisms
- Exponential backoff for failed uploads
- Circuit breakers for provider failures
- Automatic failover to backup providers
- Transaction replay for settlement issues

### Batch Processing
- Bulk version commits
- Aggregate proof generation
- Batch payment settlements
- Scheduled archive operations

## Feedback to Filecoin Onchain Cloud

### Identified Pain Points
1. **PDP + FilCDN Integration**: Need unified SLA metrics API in Synapse SDK
2. **Warm-to-Deal Orchestration**: Require atomic batch archival operations
3. **Payment Streaming**: Need threshold/limit primitives and settlement templates
4. **Developer Experience**: More granular TypeScript types and error codes

### Suggested Improvements
1. Unified event subscription system across all services
2. Built-in retry mechanisms in Synapse SDK
3. SLA violation webhooks for real-time monitoring
4. Batch operation support for cost optimization

## Future Enhancements

### Phase 2 Features
- AI-powered version comparison
- Blockchain-based digital signatures
- Cross-chain payment support
- Decentralized compute for BIM processing

### Phase 3 Features
- DAO governance for platform decisions
- Tokenized storage credits
- Peer-to-peer collaboration rooms
- Zero-knowledge compliance proofs