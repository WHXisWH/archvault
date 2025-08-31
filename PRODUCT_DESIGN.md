# ArchVault Product Design Document

## Executive Summary

ArchVault revolutionizes architectural project collaboration by transforming traditional file storage into a **verifiable, programmable storage service** powered by Filecoin Onchain Cloud. We address the $2.7 trillion construction industry's critical pain points: version control chaos, compliance archival requirements, and opaque payment settlements.

## Problem Definition & Market Analysis

### Industry Pain Points

#### 1. Version Control Crisis (Cost: $31B annually in rework)
- **Current State**: Architects email 50+ versions of drawings, leading to 23% error rate
- **Impact**: Average project delay of 3.2 months due to version mismatches
- **Root Cause**: Lack of verifiable version tracking and guaranteed retrieval

#### 2. Compliance & Archival (Legal exposure: $8B annually)
- **Requirement**: 10-30 year retention mandates for building documentation
- **Current Solution**: Expensive enterprise storage with no proof of preservation
- **Gap**: No cryptographic proof of data integrity over time

#### 3. Payment Disputes (15% of project value)
- **Issue**: Opaque billing for storage, retrieval, and collaboration services
- **Current Process**: Manual invoicing with 60-day payment cycles
- **Need**: Transparent, automated settlement based on actual usage

### Target Users

**Primary**: Architecture firms (10-500 employees) managing 5-50 concurrent projects
**Secondary**: Construction contractors, project owners, regulatory bodies
**Tertiary**: Engineering consultants, facility managers, insurance companies

## Solution Architecture

### Core Value Proposition

**"Version as Asset"** - Every project file becomes a tradeable, verifiable digital asset with:
- Cryptographic proof of existence (PDP)
- Guaranteed retrieval SLA (FilCDN)
- Transparent payment rails (Filecoin Pay)
- Long-term preservation guarantee (Filecoin Deals)

### Product Features Mapped to Filecoin Services

#### 1. Warm Storage Layer (FilecoinWarmStorageService)
**User Experience**:
- Drag-drop 800MB BIM file → 5-second upload → instant preview
- Auto-versioning with visual diff tools
- Real-time collaboration with 500ms latency

**Technical Implementation**:
```typescript
// Creating project storage bucket
const bucket = await warmStorage.createBucket({
  projectId: "tower-project-2024",
  sla: {
    availability: 99.9,
    maxLatency: 800,
    minBandwidth: 100 // Mbps
  }
});
```

#### 2. Proof of Data Possession (PDP)
**User Experience**:
- Green checkmark showing "Verified at Block #4829104"
- Audit trail export with cryptographic proofs
- Compliance dashboard with verification history

**Technical Implementation**:
```typescript
// Milestone freeze with PDP proof
const milestone = await pdp.createProofSet({
  dataSetId: bucket.id,
  files: selectedFiles,
  retentionYears: 30,
  verificationSchedule: "weekly"
});
```

#### 3. Content Delivery Network (FilCDN)
**User Experience**:
- One-click shareable links with expiration
- Global access with <800ms first byte
- Automatic failover across regions

**Technical Implementation**:
```typescript
// Generate secure retrieval URL
const shareLink = await cdn.generateSignedUrl({
  cid: file.cid,
  expiry: "7d",
  maxDownloads: 10,
  regions: ["us-west", "eu-central", "asia-pac"]
});
```

#### 4. Payment Rails (Filecoin Pay)
**User Experience**:
- Clear pricing tiers (Basic: $99, Pro: $499, Enterprise: Custom)
- Real-time usage dashboard
- Automatic invoice generation

**Technical Implementation**:
```typescript
// Subscription with streaming payments
const subscription = await payments.createRail({
  from: clientWallet,
  to: platformWallet,
  token: "USDFC",
  rate: 0.01, // per GiB per day
  mode: "streaming",
  splitRules: {
    platform: 30,
    storageProvider: 50,
    cdnProvider: 20
  }
});
```

#### 5. Unified SDK (Synapse)
**Developer Experience**:
- Single npm package for all services
- TypeScript autocomplete
- Comprehensive error handling

## User Journey Maps

### Journey 1: Project Setup
```
1. Create Project → 2. Configure SLA → 3. Invite Team → 4. Upload Initial Files
   ↓                    ↓                   ↓                ↓
[Warm Bucket]    [Smart Contract]    [Access Control]   [PDP + CDN]
```

### Journey 2: Milestone Delivery
```
1. Select Files → 2. Freeze Version → 3. Generate Proofs → 4. Share with Client
   ↓                 ↓                    ↓                   ↓
[Version Lock]   [PDP Proof]         [Audit Trail]      [Signed URL]
```

### Journey 3: Long-term Archive
```
1. Project Complete → 2. Archive Setup → 3. Deal Creation → 4. Renewal Schedule
   ↓                     ↓                  ↓                  ↓
[Final Version]     [Retention Policy]  [Multi-SP Deals]   [Auto-renewal]
```

## Business Model

### Pricing Strategy

#### Tier 1: Starter ($99/month)
- 100GB Warm Storage
- 1TB monthly bandwidth
- Daily PDP verification
- 99% availability SLA

#### Tier 2: Professional ($499/month)
- 1TB Warm Storage
- 10TB monthly bandwidth
- Hourly PDP verification
- 99.9% availability SLA
- FilCDN acceleration

#### Tier 3: Enterprise (Custom)
- Unlimited storage
- Dedicated infrastructure
- Custom PDP schedules
- 99.99% availability SLA
- White-label options

### Revenue Streams
1. **Subscription Revenue** (70%): Monthly/annual plans
2. **Transaction Fees** (20%): Milestone deliveries, archive operations
3. **Value-added Services** (10%): Custom integrations, consulting

### Unit Economics
- Customer Acquisition Cost: $500
- Lifetime Value: $12,000
- Gross Margin: 65%
- Payback Period: 6 months

## Go-to-Market Strategy

### Phase 1: Pilot (Months 1-3)
- Target: 5 architecture firms in SF/NYC
- Focus: BIM collaboration use case
- Success Metric: 10 active projects

### Phase 2: Expand (Months 4-9)
- Target: 50 firms across US
- Add: Regulatory compliance features
- Success Metric: $100K MRR

### Phase 3: Scale (Months 10-18)
- Target: Global expansion
- Add: API marketplace
- Success Metric: $1M MRR

## Competitive Analysis

### vs Traditional Cloud (Dropbox, Google Drive)
**Our Advantage**: Cryptographic proofs, guaranteed SLA, transparent pricing

### vs Enterprise ECM (SharePoint, Documentum)
**Our Advantage**: 90% lower cost, blockchain verification, no vendor lock-in

### vs Web3 Storage (Arweave, Storj)
**Our Advantage**: Warm layer for collaboration, integrated payments, industry-specific features

## Success Metrics

### Technical KPIs
- Upload Speed: P95 < 5 seconds
- Retrieval TTFB: P95 < 800ms
- PDP Success Rate: > 99.99%
- Storage Redundancy: 11 nines

### Business KPIs
- Monthly Active Projects: 1,000+
- Net Revenue Retention: > 120%
- Customer Satisfaction: > 4.5/5
- Churn Rate: < 5% annually

## Risk Mitigation

### Technical Risks
- **SP Availability**: Multi-SP strategy with automatic failover
- **Network Congestion**: Hybrid on/off-chain architecture
- **Smart Contract Bugs**: Formal verification and audits

### Business Risks
- **Adoption Resistance**: Free pilot program with white-glove onboarding
- **Regulatory Changes**: Flexible architecture supporting multiple jurisdictions
- **Competition**: Network effects through project collaboration features

## Roadmap Alignment with WaveHack

### Wave 1 Deliverables (Design Phase)
✅ Clear problem definition for architecture industry
✅ Deep integration plan for all Filecoin services
✅ GTM strategy with B2B focus
✅ Technical architecture with Synapse SDK

### Wave 2 Targets (MVP)
- Functional upload → warm → PDP → retrieval flow
- Payment rail creation and settlement
- Basic version management
- Demo video with real Calibnet transactions

### Wave 3 Goals (Polish)
- Professional UI/UX with BIM preview
- SLA monitoring dashboard
- Payment analytics and reports
- Performance optimization

### Wave 4 Objectives (Production)
- Multi-SP deployment
- Automated Deal renewal
- Customer testimonials
- Comprehensive documentation

## Feedback for Filecoin Onchain Cloud Team

### Critical Needs
1. **Unified SLA Metrics API**: Single endpoint for all performance data
2. **Batch Operations**: Atomic multi-file operations for consistency
3. **Payment Templates**: Pre-built settlement patterns for common use cases
4. **Better Error Messages**: More descriptive errors with resolution hints

### Nice-to-Have
1. WebSocket subscriptions for real-time events
2. GraphQL API for flexible queries
3. CLI tools for debugging
4. Terraform modules for infrastructure

## Conclusion

ArchVault leverages the full depth of Filecoin Onchain Cloud services to solve real, expensive problems in the architecture industry. Our deep integration with FilecoinWarmStorageService, PDP, FilCDN, and Payments positions us as the definitive solution for verifiable architectural collaboration and archival.