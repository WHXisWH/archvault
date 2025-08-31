# ArchVault - Verifiable Collaboration & Archive Cloud for Architecture Industry

**Built on Filecoin Onchain Cloud Services**

ArchVault transforms architectural drawings, BIM models, contracts, and site documentation into **verifiable version assets** on programmable storage services, providing **second-level accessible Warm layer**, **PDP proof + FilCDN rapid retrieval**, **FIL/ERC-20 streaming settlement**, and **auditable frozen archives**.

## 🏗️ Problem We Solve

The architecture industry faces critical challenges in cross-organizational collaboration:
- **Version Control Crisis**: Large files with frequent revisions, slow external collaboration, serious version mismatches
- **Compliance Requirements**: 10-30 year archival requirements with auditable proof
- **Retrieval SLA**: Critical deliverables need guaranteed retrieval times with standardized payment settlement
- **Trust & Verification**: Lack of verifiable "preservation" and "evidence" in traditional cloud storage

## 💡 Our Solution

ArchVault leverages Filecoin Onchain Cloud to create a comprehensive storage and collaboration platform:

### Core Features
- **Warm Storage Layer**: Fast read/write during active collaboration using FilecoinWarmStorageService
- **Verifiable Archives**: PDP proofs for long-term verifiable preservation with Filecoin Deals
- **Guaranteed Retrieval**: FilCDN + PDP providing SLA-backed content delivery
- **Transparent Settlement**: Filecoin Pay for B2B settlement with streaming/subscription payments
- **Version as Asset**: Each frozen version becomes an on-chain record with payment/retrieval SLA terms

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Yarn or npm
- MetaMask wallet
- Filecoin Calibnet testnet FIL
- USDFC test tokens

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/archvault
cd archvault

# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env

# Configure your .env file with:
# - RPC_URL (Calibnet)
# - PRIVATE_KEY (for development)
# - Contract addresses
```

### Development

```bash
# Run development server
yarn dev

# Run complete demo flow
yarn demo:archvault

# Deploy contracts (Calibnet)
yarn deploy:calibnet
```

## 🏛️ Architecture

### Tech Stack
- **Frontend**: Next.js, TypeScript, TailwindCSS, ethers.js
- **Smart Contracts**: Solidity, Filecoin Onchain Cloud contracts
- **Storage**: FilecoinWarmStorageService, PDP, FilCDN
- **Payments**: Filecoin Pay (streaming, subscription, one-time)
- **SDK**: Synapse SDK for unified API access

### Filecoin Onchain Cloud Integration

#### 1. Warm Storage Service
```typescript
const warm = synapse.warmStorage();
await warm.createBucket({ 
  projectId, 
  sla: { ttfbMs: 800, availability: 99.9 } 
});
```

#### 2. PDP Verification
```typescript
await warm.commitMilestone({
  warmCid,
  retentionDays: 3650,
  pdp: { frequency: 'weekly' }
});
```

#### 3. FilCDN Delivery
```typescript
const url = await cdn.signUrl({ 
  cid, 
  expiresIn: 3600 
});
```

#### 4. Filecoin Pay
```typescript
await pay.subscribe({
  planId: 'archvault-pro',
  token: 'USDFC',
  mode: 'streaming'
});
```

## 📊 Performance Metrics

- **Warm Upload**: P95 < 5s
- **FilCDN TTFB**: P95 < 800ms
- **Version Deduplication**: >60% bandwidth savings
- **PDP Verification**: Daily/Weekly intervals
- **Payment Settlement**: Automatic with smart contracts

## 🔗 Filecoin Services Used

### Deep Integration Points
1. **FilecoinWarmStorageService**
   - Project-level warm buckets
   - CAR-based incremental storage
   - Automatic Deal creation for archives

2. **Proof of Data Possession (PDP)**
   - Regular verification schedules
   - SLA enforcement
   - Audit trail generation

3. **FilCDN**
   - Guaranteed retrieval SLA
   - Global edge caching
   - Bandwidth optimization

4. **Filecoin Pay**
   - One-time payments for deliverables
   - Subscription for ongoing storage
   - Streaming payments for usage-based billing
   - Automatic provider settlement

5. **Synapse SDK**
   - Unified API interface
   - Event callbacks
   - Error handling

## 🎯 Use Cases

1. **Active Collaboration**: Design teams upload BIM models, get instant previews, track versions
2. **Milestone Delivery**: Freeze versions with PDP proof, guaranteed retrieval SLA
3. **Compliance Archive**: Long-term storage with verifiable proof for 10-30 years
4. **Cross-org Settlement**: Transparent payment flows between contractors, designers, owners

## 📈 Business Model

- **Subscription Tiers**: Basic/Pro/Enterprise with different SLA levels
- **Usage-based**: Storage (GiB·day) + Bandwidth + PDP verifications
- **One-time Fees**: Milestone deliverables and frozen versions
- **Revenue Share**: Automatic settlement to Storage Providers, CDN nodes, Platform

## 🤝 Contributing

We actively seek feedback on Filecoin Onchain Cloud services:
- PDP + FilCDN unified SLA metrics API
- Warm-to-Deal orchestration atomicity
- Payment streaming thresholds and templates
- TypeScript types and error handling improvements

## 📝 License

MIT

## 🔍 Demo Scenarios

### Scenario A: Fast Collaboration
1. Designer uploads 800MB IFC file → Warm CID in seconds
2. Minor revision → Only differential blocks uploaded (10s)
3. Reviewer access via signed URL → FilCDN delivery <500ms TTFB
4. Streaming payment auto-settles based on usage

### Scenario B: Compliant Delivery
1. Lead approver freezes version → Triggers PDP + cold archive Deals
2. SLA configuration → FilCDN guaranteed retrieval with penalties
3. Export evidence package → Version CID, PDP proofs, Deal info, signatures

## 📞 Contact

- GitHub: [your-github]
- Email: team@archvault.io
- Discord: [discord-link]

---

**Built for Filecoin WaveHack 2024**