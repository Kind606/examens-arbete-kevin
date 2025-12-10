export type User = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: string;
  username: string;
  token: string;
};

export type Exercise = {
  id: string;
  name: string;
  slug: string;
  defaultSets: number | null;
  defaultReps: number | null;
};

export type Day = {
  id: string;
  name: string;
  slug: string;
  exercises: Exercise[];
};


export type Split = {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  days?: Day[];
};

// props for components

export interface SplitCardProps {
  splitSlug: string;
  daySlug: string;
  dayName: string;
  isEmpty: boolean;
  exercises?: { id: string; name: string }[];
}

export interface SplitClientProps {
  user: AuthUser;
  split: Split;
}

export interface SplitDayClientProps {
  day: Day;
}