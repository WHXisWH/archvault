import { SynapseWrapper } from './synapse-wrapper';
import type { StorageFile, Project, Version } from './types';

export class StorageService {
  private synapse: SynapseWrapper;
  private storageInstances: Map<string, any> = new Map();

  constructor(synapse: SynapseWrapper) {
    this.synapse = synapse;
  }

  async createProjectStorage(project: Project) {
    const { storage, bucketId } = await this.synapse.createWarmBucket(
      project.id,
      project.sla
    );

    this.storageInstances.set(project.id, storage);

    return {
      bucketId,
      storage,
    };
  }

  async uploadFile(
    projectId: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<StorageFile> {
    const storage = this.storageInstances.get(projectId);
    if (!storage) {
      throw new Error('Storage not initialized for project');
    }

    const result = await this.synapse.uploadToWarm(storage, file, onProgress);

    const storageFile: StorageFile = {
      cid: result.cid,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      uploadedBy: 'current-user',
      version: 1,
      status: 'warm',
      metadata: {
        originalName: file.name,
        mimeType: file.type,
      },
    };

    return storageFile;
  }

  async createVersion(
    projectId: string,
    files: StorageFile[],
    name: string,
    description?: string
  ): Promise<Version> {
    const versionId = `v-${projectId}-${Date.now()}`;
    const rootCid = await this.calculateRootCid(files);

    const version: Version = {
      id: versionId,
      projectId,
      versionNumber: await this.getNextVersionNumber(projectId),
      cid: rootCid,
      name,
      description,
      files: files.map(f => f.cid),
      createdAt: new Date(),
      createdBy: 'current-user',
      isFrozen: false,
      signatures: [],
    };

    return version;
  }

  async freezeVersion(version: Version, retentionDays: number) {
    const storage = this.storageInstances.get(version.projectId);
    if (!storage) {
      throw new Error('Storage not initialized for project');
    }

    const files = await this.getFilesByCids(version.files);
    const proofSet = await this.synapse.createProofSet(
      storage,
      files,
      retentionDays
    );

    version.isFrozen = true;
    version.pdpProof = {
      proofSetId: proofSet.proofSetId,
      rootCids: proofSet.rootCids,
      createdAt: proofSet.createdAt,
      lastVerified: proofSet.createdAt,
      nextVerification: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'verified',
    };

    return version;
  }

  async getFile(cid: string): Promise<Uint8Array> {
    const result = await this.synapse.retrieveFromCDN(cid);
    return result.data;
  }

  async getSignedUrl(cid: string, expirySeconds?: number): Promise<string> {
    return await this.synapse.generateSignedUrl(cid, expirySeconds);
  }

  async listProjectFiles(projectId: string): Promise<StorageFile[]> {
    const storage = this.storageInstances.get(projectId);
    if (!storage) {
      throw new Error('Storage not initialized for project');
    }
    return await this.synapse.listFiles(storage);
  }

  async getProjectVersions(projectId: string): Promise<Version[]> {
    const storage = this.storageInstances.get(projectId);
    if (!storage) {
      throw new Error('Storage not initialized for project');
    }
    return await this.synapse.getVersions(storage);
  }

  private async calculateRootCid(files: StorageFile[]): Promise<string> {
    const cids = files.map(f => f.cid).sort();
    const data = cids.join('');
    const buffer = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `bafkrei${hashHex.substring(0, 52)}`;
  }

  private async getNextVersionNumber(projectId: string): Promise<number> {
    const versions = await this.getProjectVersions(projectId);
    return (versions.length || 0) + 1;
  }

  private async getFilesByCids(cids: string[]): Promise<StorageFile[]> {
    // In a real implementation, this would fetch file details from storage
    return cids.map((cid, index) => ({
      cid,
      name: `file-${index}.dat`,
      size: 0, // Should be fetched
      type: 'application/octet-stream',
      uploadedAt: new Date(),
      uploadedBy: 'system',
      version: 1,
      status: 'warm',
      metadata: {},
    }));
  }
}
