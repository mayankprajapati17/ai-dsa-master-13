
import { LucideIcon } from 'lucide-react';

export type Resource = {
  title: string;
  url: string;
};

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Subtopic = {
  title: string;
  difficulty: Difficulty;
  resources: Resource[];
};

export type SubtopicsByDifficulty = {
  easy: Subtopic[];
  medium: Subtopic[];
  hard: Subtopic[];
};

export type TopicSection = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  subtopics: SubtopicsByDifficulty;
};
