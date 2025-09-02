import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { IntegratedWorkflowDemo } from '@/components/demo/IntegratedWorkflowDemo';
import { SLAMonitoringPanel } from '@/components/demo/SLAMonitoringPanel';
import { ProjectHeader } from '@/components/project/ProjectHeader';
import { StorageServicePanel } from '@/components/project/StorageServicePanel';
import { VersionHistoryWithPDP } from '@/components/project/VersionHistoryWithPDP';
import { PaymentStreamStatus } from '@/components/project/PaymentStreamStatus';
import type { Project } from '@/lib/types';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const mockProject: Project = {
            id: id as string,
            name: 'City Tower Complex',
            description: 'Mixed-use development with 3 towers, focusing on sustainable design and smart building technology.',
            status: 'active',
            fileCount: 156,
            totalSize: 2.3 * 1024 * 1024 * 1024,
            lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            owner: 'user-123',
            team: ['user-123', 'user-456'],
            sla: { availability: 99.9, maxLatency: 800, minBandwidth: 100 },
          };
          setProject(mockProject);
        } catch (error) {
          console.error('Failed to fetch project details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <Layout showSidebar><div className="text-center py-10">Loading project...</div></Layout>;
  }

  if (!project) {
    return <Layout showSidebar><div className="text-center py-10">Project not found.</div></Layout>;
  }

  return (
    <Layout showSidebar>
      <div className="p-8">
        <ProjectHeader project={project} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <StorageServicePanel warmStorage={{}} archiveDeals={[]} showTransition={true} />
            <VersionHistoryWithPDP versions={[]} pdpProofs={[]} />
          </div>

          <div className="space-y-6">
            <SLAMonitoringPanel />
            <PaymentStreamStatus subscriptions={[]} usageBasedCharges={{}} providerPayouts={[]} />
          </div>
        </div>

        <div className="mt-12">
          <IntegratedWorkflowDemo />
        </div>
      </div>
    </Layout>
  );
}