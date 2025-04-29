
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { topics } from '@/data/topics';
import { Difficulty, TopicSection } from '@/types';

const difficultyColors = {
  easy: 'bg-green-500 hover:bg-green-600',
  medium: 'bg-yellow-500 hover:bg-yellow-600',
  hard: 'bg-red-500 hover:bg-red-600',
};

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const Topics = () => {
  const [selectedTopic, setSelectedTopic] = useState<TopicSection | null>(null);

  const handleSelectTopic = (topic: TopicSection) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="py-24 bg-dsablue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Data Structures & Algorithms Topics
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore our comprehensive curriculum designed to help you master DSA concepts from fundamentals to advanced topics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {topics.map((topic) => (
            <Card 
              key={topic.id}
              onClick={() => handleSelectTopic(topic)}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-white/10 bg-dsablue/30 backdrop-blur-sm hover:bg-dsablue/50 ${selectedTopic?.id === topic.id ? 'ring-2 ring-dsapurple' : ''}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center h-12 w-12 bg-dsapurple/20 rounded-lg mb-4">
                  <topic.icon className="text-dsapurple" size={24} />
                </div>
                <CardTitle className="text-xl text-white">{topic.title}</CardTitle>
                <CardDescription className="text-white/70">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Badge className="bg-green-500/20 text-green-300">
                    {topic.subtopics.easy.length} Easy
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-300">
                    {topic.subtopics.medium.length} Medium
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-300">
                    {topic.subtopics.hard.length} Hard
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTopic && (
          <div className="animate-fade-in-up bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-dsapurple/20 rounded-lg flex items-center justify-center mr-4">
                <selectedTopic.icon className="text-dsapurple" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedTopic.title}</h3>
                <p className="text-white/70">{selectedTopic.description}</p>
              </div>
            </div>

            <Tabs defaultValue="easy" className="w-full">
              <TabsList className="w-full mb-6 bg-white/10">
                <TabsTrigger value="easy" className="flex-1">Easy</TabsTrigger>
                <TabsTrigger value="medium" className="flex-1">Medium</TabsTrigger>
                <TabsTrigger value="hard" className="flex-1">Hard</TabsTrigger>
              </TabsList>
              
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty) => (
                <TabsContent key={difficulty} value={difficulty}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTopic.subtopics[difficulty].map((subtopic, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">{subtopic.title}</h4>
                        <div className="mb-2">
                          <Badge className={difficultyColors[subtopic.difficulty]}>
                            {difficultyLabels[subtopic.difficulty]}
                          </Badge>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-white/70 mb-1">Resources:</p>
                          <ul className="space-y-1">
                            {subtopic.resources.map((resource, i) => (
                              <li key={i}>
                                <a 
                                  href={resource.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-dsapurple hover:underline text-sm flex items-center"
                                >
                                  {resource.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topics;
