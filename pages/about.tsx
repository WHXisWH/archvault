import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About ArchVault | Verifiable Collaboration for Architects</title>
        <meta
          name="description"
          content="Learn how ArchVault is revolutionizing the architecture industry with verifiable, programmable storage powered by Filecoin."
        />
      </Head>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-DEFAULT mb-4">
            Redefining Architectural Collaboration
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto">
            ArchVault transforms architectural files into verifiable assets, solving the critical industry challenges of version control, compliance, and payment settlement.
          </p>
        </header>

        <div className="bg-surface rounded-lg shadow-md p-8 sm:p-12 mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Vision</h2>
          <p className="text-text-muted text-center max-w-4xl mx-auto leading-relaxed">
            In an industry where a single misplaced file can lead to millions in rework costs and significant project delays, ArchVault provides a single source of truth. We leverage the power of Filecoin Onchain Cloud to turn every project file into a tradeable, verifiable digital asset with cryptographic proof of existence, guaranteed retrieval, and transparent payment rails. Our vision is to bring unparalleled trust, efficiency, and security to the $2.7 trillion construction industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Version as Asset"
            description="Every file version is cryptographically sealed, creating an immutable audit trail and eliminating version control chaos."
          />
          <FeatureCard
            title="Guaranteed Retrieval & SLA"
            description="With FilCDN, we provide SLA-backed, high-speed access to critical files, ensuring your data is there when you need it."
          />
          <FeatureCard
            title="Verifiable Compliance"
            description="Meet 10-30 year retention mandates with cryptographic proof of data integrity (PDP), making audits straightforward."
          />
          <FeatureCard
            title="Transparent Payments"
            description="Utilize Filecoin Pay for automated, transparent settlement based on actual usage, reducing payment disputes."
          />
          <FeatureCard
            title="Warm & Cold Storage"
            description="Benefit from a fast, collaborative warm storage layer for active projects and a secure, cost-effective cold storage for long-term archival."
          />
          <FeatureCard
            title="Unified Platform"
            description="Access all services through a single, intuitive interface, simplifying workflow for architects, contractors, and clients."
          />
        </div>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="bg-surface p-6 rounded-lg shadow-sm border border-border hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
    <p className="text-text-muted">{description}</p>
  </div>
);

export default AboutPage;
