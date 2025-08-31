import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NewProject() {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [slaAvailability, setSlaAvailability] = useState(99.9);
  const [slaLatency, setSlaLatency] = useState(800);
  const [slaBandwidth, setSlaBandwidth] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newProject = {
      name: projectName,
      description: projectDescription,
      sla: {
        availability: slaAvailability,
        maxLatency: slaLatency,
        minBandwidth: slaBandwidth,
      },
    };

    console.log('Creating new project:', newProject);

    // In a real application, you would send this to your API
    // try {
    //   const response = await fetch('/api/projects/new', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newProject),
    //   });
    //   if (response.ok) {
    //     const createdProject = await response.json();
    //     router.push(`/projects/${createdProject.id}`);
    //   } else {
    //     // Handle error
    //     console.error('Failed to create project');
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    // }

    // For now, just simulate a delay and redirect
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/projects');
    }, 1000);
  };

  return (
    <Layout showSidebar>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <button onClick={() => router.back()} className="text-sm font-medium text-gray-600 hover:text-gray-900 mb-4 flex items-center">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Projects
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Create New Project</h1>
            <p className="mt-1 text-sm text-gray-600">Start by defining your project details and service level agreements.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  id="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">Project Description</label>
                <textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium text-gray-900">Service Level Agreement (SLA)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="sla-availability" className="block text-sm font-medium text-gray-700">Availability (%)</label>
                    <input
                      type="number"
                      id="sla-availability"
                      value={slaAvailability}
                      onChange={(e) => setSlaAvailability(parseFloat(e.target.value))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      step="0.01"
                      min="90"
                      max="99.99"
                    />
                  </div>
                  <div>
                    <label htmlFor="sla-latency" className="block text-sm font-medium text-gray-700">Max Latency (ms)</label>
                    <input
                      type="number"
                      id="sla-latency"
                      value={slaLatency}
                      onChange={(e) => setSlaLatency(parseInt(e.target.value))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      step="50"
                      min="100"
                    />
                  </div>
                  <div>
                    <label htmlFor="sla-bandwidth" className="block text-sm font-medium text-gray-700">Min Bandwidth (Mbps)</label>
                    <input
                      type="number"
                      id="sla-bandwidth"
                      value={slaBandwidth}
                      onChange={(e) => setSlaBandwidth(parseInt(e.target.value))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      step="10"
                      min="10"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
