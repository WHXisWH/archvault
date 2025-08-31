const { SynapseWrapper } = require('../lib/synapse-wrapper');

async function main() {
  console.log('Starting ArchVault Demo Flow...');

  const synapse = SynapseWrapper.getInstance();

  // 1. Create a new project
  console.log('\nStep 1: Creating a new project...');
  const project = {
    id: 'demo-project',
    name: 'Demo Project',
    description: 'A project for demonstration purposes.',
    sla: { availability: 99.9, maxLatency: 800, minBandwidth: 100 },
  };
  const { bucketId } = await synapse.storage.createProjectStorage(project);
  console.log(`Project storage created with bucket ID: ${bucketId}`);

  // 2. Upload a file
  console.log('\nStep 2: Uploading a file...');
  const mockFile = new File(['This is a mock file content'], 'design_v1.txt', { type: 'text/plain' });
  const uploadedFile = await synapse.storage.uploadFile(project.id, mockFile, (progress) => {
    console.log(`Upload progress: ${progress}%`);
  });
  console.log(`File uploaded with CID: ${uploadedFile.cid}`);

  // 3. Create a version
  console.log('\nStep 3: Creating a new version...');
  const version = await synapse.versions.createVersion(
    project.id,
    [uploadedFile],
    'Initial Design',
    'The first version of the design.'
  );
  console.log(`Version created: ${version.name} (v${version.versionNumber})`);

  // 4. Freeze the version
  console.log('\nStep 4: Freezing the version...');
  const frozenVersion = await synapse.storage.freezeVersion(version, 365);
  console.log(`Version frozen with PDP proof set ID: ${frozenVersion.pdpProof.proofSetId}`);

  // 5. Generate a signed URL
  console.log('\nStep 5: Generating a signed URL...');
  const signedUrl = await synapse.cdn.generateSignedUrl(uploadedFile.cid);
  console.log(`Signed URL: ${signedUrl}`);

  console.log('\nDemo Flow Completed!');
}

main().catch(console.error);
