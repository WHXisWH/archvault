export interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  team: string[];
  createdAt: Date;
  lastModified: Date;
  status: 'active' | 'archived' | 'frozen';
  sla: SLAConfig;
  fileCount: number;
  totalSize: number;
}

export interface SLAConfig {
  availability: number;
  maxLatency: number;
  minBandwidth: number;
}

export interface StorageFile {
  cid: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  uploadedBy: string;
  version: number;
  parentCid?: string;
  pdpProofSetId?: string;
  status: 'uploading' | 'warm' | 'archived' | 'frozen';
  metadata: Record<string, any>;
}

export interface Version {
  id: string;
  projectId: string;
  versionNumber: number;
  cid: string;
  name: string;
  description?: string;
  files: string[];
  createdAt: Date;
  createdBy: string;
  isFrozen: boolean;
  pdpProof?: PDPProof;
  signatures: Signature[];
}

export interface PDPProof {
  proofSetId: string;
  rootCids: string[];
  createdAt: Date;
  lastVerified: Date;
  nextVerification: Date;
  status: 'pending' | 'verified' | 'failed';
  txHash?: string;
}

export interface Signature {
  signer: string;
  signature: string;
  timestamp: Date;
  message: string;
}

export interface PaymentPlan {
  id: string;
  name: string;
  type: 'subscription' | 'one-time' | 'streaming';
  amount: bigint;
  token: string;
  interval?: 'monthly' | 'yearly';
  features: string[];
}

export interface PaymentRail {
  railId: string;
  from: string;
  to: string;
  token: string;
  paymentRate: bigint;
  lockupPeriod: number;
  settledUpTo: number;
  endEpoch?: number;
  status: 'active' | 'terminated';
}

export interface StorageProvider {
  id: number;
  address: string;
  serviceUrl: string;
  peerId: string;
  region: string;
  reputation: number;
  pricing: {
    storagePerGibDay: bigint;
    retrievalPerGib: bigint;
    pdpVerification: bigint;
  };
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  speed: number;
  remainingTime: number;
  status: 'preparing' | 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export interface RetrievalMetrics {
  cid: string;
  ttfb: number;
  throughput: number;
  provider: string;
  timestamp: Date;
  success: boolean;
  cdnHit: boolean;
}

export interface SLAMetrics {
  projectId: string;
  period: Date;
  availability: number;
  averageLatency: number;
  p95Latency: number;
  p99Latency: number;
  pdpSuccessRate: number;
  violations: SLAViolation[];
}

export interface SLAViolation {
  timestamp: Date;
  type: 'availability' | 'latency' | 'pdp';
  expected: number;
  actual: number;
  penalty: bigint;
}
