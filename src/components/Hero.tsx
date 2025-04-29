
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 -right-[10%] w-[600px] h-[600px] bg-dsapurple/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-dsapurple/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Master <span className="text-dsapurple">Data Structures</span> & <span className="text-dsapurple">Algorithms</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-white/80 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            Learn DSA with AI-powered assistance, interactive coding challenges, and personalized learning paths.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <button className="hero-button hero-button-primary flex items-center justify-center">
              Start Learning
              <ArrowRight className="ml-2" size={18} />
            </button>
            <button className="hero-button hero-button-secondary flex items-center justify-center">
              Explore Topics
              <BookOpen className="ml-2" size={18} />
            </button>
          </div>
          
          <div className="mt-12 relative">
            <div className="relative rounded-lg shadow-xl overflow-hidden border border-white/10 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              {/* Code Editor Preview */}
              <div className="bg-dsablue-light rounded-lg p-3">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-white/60">DSAMaster/coding-challenge.py</div>
                </div>
                
                {/* Code Content */}
                <pre className="rounded bg-[#1E2433] p-4 text-left overflow-x-auto">
                  <code className="text-sm">
                    <span className="text-blue-400">def</span> <span className="text-green-400">binary_search</span><span className="text-white">(arr, target):</span>
                    <br />
                    <span className="text-white pl-4">left, right = 0, len(arr) - 1</span>
                    <br />
                    <br />
                    <span className="text-white pl-4">while left &lt;= right:</span>
                    <br />
                    <span className="text-white pl-8">mid = left + (right - left) // 2</span>
                    <br />
                    <br />
                    <span className="text-white pl-8">if arr[mid] == target:</span>
                    <br />
                    <span className="text-white pl-12">return mid</span>
                    <br />
                    <span className="text-white pl-8">elif arr[mid] &lt; target:</span>
                    <br />
                    <span className="text-white pl-12">left = mid + 1</span>
                    <br />
                    <span className="text-white pl-8">else:</span>
                    <br />
                    <span className="text-white pl-12">right = mid - 1</span>
                    <br />
                    <br />
                    <span className="text-white pl-4">return -1</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
