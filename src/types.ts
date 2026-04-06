export interface Issue {
  id: string;
  title: string;
  slug: string;
  summary: string;
  keyPoints: string[];
  whyItMatters: string[];
  shareTags: string[];
}

export type Channel = 'X' | 'IG' | 'FB' | 'LinkedIn' | 'SMS' | 'Email';
export type Audience = 'friend' | 'undecided' | 'busy parent' | 'renter' | 'union member' | 'student' | 'senior';
export type Tone = 'neutral' | 'neighborly' | 'rally-ready';
export type Length = 'short' | 'medium' | 'long';

export interface SharePackRequest {
  issueSlug: string;
  channel: Channel;
  audience: Audience;
  tone: Tone;
  length: Length;
}

export interface SharePackResponse {
  content: string[]; // 3 options
}

export interface PracticeScenario {
  objection: string;
  reply: string;
  followUp: string;
  bridge: string;
}
