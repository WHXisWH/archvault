import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { FileLock, Users, GitBranch, ArrowRight, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-background to-blue-50 overflow-hidden animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-text-DEFAULT sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Verifiable Collaboration</span>{' '}
                  <span className="block text-primary xl:inline">for Architecture</span>
                </h1>
                <p className="mt-3 text-base text-text-muted sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Secure, trackable, and auditable file storage and collaboration, built on the Filecoin network. ArchVault brings trust and transparency to your most important projects.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/dashboard"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-hover md:py-4 md:text-lg md:px-10"
                    >
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-primary to-accent opacity-20 transform -skew-x-12"></div>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
             <div className="relative w-3/4 h-3/4">
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/30 rounded-lg animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/30 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 border-4 border-primary/50 rounded-lg transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                <FileLock className="absolute top-1/4 left-1/4 w-16 h-16 text-primary/80" />
                <Users className="absolute bottom-1/4 right-1/4 w-16 h-16 text-accent/80" />
             </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Why ArchVault</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-DEFAULT sm:text-4xl">
              A better way to build
            </p>
            <p className="mt-4 max-w-2xl text-xl text-text-muted lg:mx-auto">
              Everything you need to ensure the integrity and progress of your architectural projects.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative p-6 bg-gray-50 rounded-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <FileLock className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text-DEFAULT">Secure & Immutable Storage</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-text-muted">
                  Leverage the power of Filecoin for decentralized storage, ensuring your files are safe, redundant, and tamper-proof.
                </dd>
              </div>

              <div className="relative p-6 bg-gray-50 rounded-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up" style={{animationDelay: '150ms'}}>
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <GitBranch className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text-DEFAULT">Verifiable Project History</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-text-muted">
                  Every file change is tracked and recorded on-chain, providing a transparent and undeniable audit trail for all stakeholders.
                </dd>
              </div>

              <div className="relative p-6 bg-gray-50 rounded-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up" style={{animationDelay: '300ms'}}>
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text-DEFAULT">Seamless Collaboration</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-text-muted">
                  Share progress, manage versions, and collaborate with your team and clients in a single, trusted environment.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
}