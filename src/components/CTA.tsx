
import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-dsapurple/20 to-dsablue-light/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-dsapurple/10 backdrop-blur-sm p-8 md:p-12">
          {/* Background decor */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-dsapurple/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-dsapurple/10 rounded-full blur-3xl"></div>
          
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to master algorithms?
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Join thousands of developers who are improving their DSA skills and acing technical interviews with DSA Master.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <button className="hero-button hero-button-primary flex items-center justify-center whitespace-nowrap">
                Start Learning Now
                <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
