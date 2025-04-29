
import React from 'react';
import { Brain, Code, Lightbulb } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'AI Assistant',
      description: 'Get instant help and explanations from our AI-powered learning assistant.',
      icon: Brain,
      delay: '0.1s'
    },
    {
      title: 'Interactive Coding',
      description: 'Practice with our built-in code editor and get real-time feedback.',
      icon: Code,
      delay: '0.3s'
    },
    {
      title: 'Smart Learning Path',
      description: 'Follow a personalized curriculum adapted to your skill level.',
      icon: Lightbulb,
      delay: '0.5s'
    }
  ];

  return (
    <div className="py-24 bg-dsablue-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Feature Highlights
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover how DSA Master helps you learn faster and more effectively
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card animate-fade-in-up"
              style={{ animationDelay: feature.delay }}
            >
              <div className="h-12 w-12 bg-dsapurple/20 rounded-lg flex items-center justify-center mb-5">
                <feature.icon className="text-dsapurple" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
