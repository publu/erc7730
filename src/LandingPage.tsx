import React from 'react';
import heroImage from './preview-example-poap.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 font-sans text-gray-800">
      {/* Header / Navbar */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-md">
        <div className="flex items-center space-x-2 font-bold text-xl text-green-700">
          <span className="transform hover:scale-110 transition-transform">🌱</span>
          <span>ERC-7730 Manager</span>
        </div>
        <a 
          href="https://developers.ledger.com/docs/clear-signing/erc7730" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-green-700 hover:text-green-900 transition-colors"
        >
          Learn More
        </a>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 space-y-10 md:space-y-0">
        <div className="md:w-1/2 space-y-6 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Make Your Blockchain Transactions <span className="text-green-700">Crystal Clear</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            ERC-7730 helps you see exactly what you’re agreeing to when you sign a blockchain transaction. 
            No more confusing hex data. Now you get human-readable instructions, token amounts, and meaningful labels.
          </p>
          <button
            onClick={onGetStarted}
            className="px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-semibold text-lg"
          >
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          {/* Placeholder for a hero illustration - replace with your own SVG or image */}
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-md shadow-inner flex items-center justify-center animate-fadeIn scale-95">
            {/* Imagine a nice SVG illustration explaining ERC-7730 */}
            <img 
              src={heroImage} 
              alt="ERC-7730 Illustration" 
              className="h-64 bg-gray-200 rounded-md shadow-inner animate-fadeIn scale-95"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">How It Works</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Under the hood, ERC-7730 provides a JSON file with instructions for wallets. 
            Wallets use this file to present you with a clear summary of what the transaction does, 
            so you can confidently proceed.
          </p>

          {/* A conceptual diagram (replace with a real image or SVG) */}
          <div className="w-full h-64 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center">
            <span className="text-gray-600">[Conceptual Diagram of Data Flow]</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 md:px-16 bg-gradient-to-b from-gray-50 to-white animate-fadeInUp">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700">Why ERC-7730?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Feature 1 */}
            <div className="bg-white shadow p-6 rounded-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mb-4 bg-green-100 text-green-700 flex items-center justify-center rounded-full">
                {/* Placeholder icon */}
                <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Total Clarity</h3>
              <p className="text-gray-700">
                Instead of cryptic hex codes, see clear labels, token names, amounts, and what actions will occur.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow p-6 rounded-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mb-4 bg-green-100 text-green-700 flex items-center justify-center rounded-full">
                {/* Placeholder icon */}
                <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-gray-700">
                Quickly spot suspicious transactions before you sign, reducing the risk of scams or mistakes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow p-6 rounded-md hover:shadow-lg transform hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 mb-4 bg-green-100 text-green-700 flex items-center justify-center rounded-full">
                {/* Placeholder icon */}
                <svg width="24" height="24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Better Experience</h3>
              <p className="text-gray-700">
                Interacting with DeFi, NFTs, and other dApps becomes more user-friendly and stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Info & Links Section */}
      <section className="py-16 px-8 md:px-16 bg-white animate-fadeIn">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">Want to Dive Deeper?</h2>
          <p className="text-lg text-gray-700">
            Check out official docs and discussions for more technical details or to stay updated.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mt-6">
            <a
              href="https://developers.ledger.com/docs/clear-signing/erc7730"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-green-700 text-green-700 hover:bg-green-100 rounded transition-colors"
            >
              Ledger Dev Docs
            </a>
            <a
              href="https://ethereum-magicians.org/t/eip-7730-proposal-for-a-clear-signing-standard-format-for-wallets/20403"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-green-700 text-green-700 hover:bg-green-100 rounded transition-colors"
            >
              Original Proposal
            </a>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 px-8 md:px-16 bg-gray-50 text-center animate-fadeInUp">
        <h2 className="text-3xl font-bold mb-4 text-green-700">Ready to Get Started?</h2>
        <p className="text-lg text-gray-700 max-w-lg mx-auto mb-8">
          Start generating your ERC-7730 metadata now and enjoy a clearer, safer signing experience.
        </p>
        <button
          onClick={onGetStarted}
          className="px-8 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-xl font-semibold"
        >
          Get Started
        </button>
      </section>
      
      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} ERC-7730 Metadata Manager</p>
      </footer>

      {/* Example of Tailwind animations, add them to your CSS if needed */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-in forwards;
          opacity: 0;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-in forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
