export interface Topic {
  id: string;
  title: string;
  goal: string;
  archived: boolean;
}
export type SessionStatus = 'planned' | 'completed';
export interface StudySession {
  id: string;
  topicId: string;
  title: string;
  date: string;
  minutes: number;
  kind: string;
  task: string;
  status: SessionStatus;
  understood: string;
  question: string;
  needsReview: boolean;
  reviewed?: boolean;
}
export interface SelectOption {
  value: string;
  label: string;
}
