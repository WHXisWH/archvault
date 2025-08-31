import type { StorageFile, Version } from './types';

export class VersionManager {
  private versions: Map<string, Version[]> = new Map();

  public async createVersion(
    projectId: string,
    files: StorageFile[],
    name: string,
    description?: string
  ): Promise<Version> {
    const projectVersions = this.versions.get(projectId) || [];
    const newVersionNumber = projectVersions.length + 1;

    const newVersion: Version = {
      id: `v${newVersionNumber}-${projectId}`,
      projectId,
      versionNumber: newVersionNumber,
      cid: await this.calculateVersionCid(files),
      name,
      description,
      files: files.map(f => f.cid),
      createdAt: new Date(),
      createdBy: 'current-user',
      isFrozen: false,
      signatures: [],
    };

    projectVersions.push(newVersion);
    this.versions.set(projectId, projectVersions);

    return newVersion;
  }

  public async getProjectVersions(projectId: string): Promise<Version[]> {
    return this.versions.get(projectId) || [];
  }

  public async getVersion(versionId: string): Promise<Version | undefined> {
    for (const projectVersions of this.versions.values()) {
      const found = projectVersions.find(v => v.id === versionId);
      if (found) return found;
    }
    return undefined;
  }

  private async calculateVersionCid(files: StorageFile[]): Promise<string> {
    const cids = files.map(f => f.cid).sort().join('');
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(cids));
    return `bafkreib${Buffer.from(hash).toString('hex').substring(0, 52)}`;
  }
}
