import React from 'react';

export interface Snippet {
  id: string;
  title: string;
  code: string;
  description?: string;
  output?: string;
}

export interface Topic {
  id: string;
  title: string;
  icon: React.ReactNode;
  snippets: Snippet[];
}

export interface PredictionRow {
  topic: string;
  code: string;
  result: string;
}

export interface EssayQuestion {
  id: string;
  question: string;
  answer: string;
}