export type User = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: string;
  username: string;
  token: string;
};

export type ExerciseLog = {
  id: string;
  exerciseId: string;
  sets: number | null;
  reps: number | null;
  weight: number | null;
  comment?: string | null;
  createdAt: Date;
};

export type Exercise = {
  id: string;
  name: string;
  slug: string;
  videoUrl: string | null;
  defaultSets: number | null;
  defaultReps: number | null;
  logs?: ExerciseLog[];
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
  splitSlug: string;
  daySlug: string;
  user: AuthUser;
}

export interface GetExerciseContextProps {
  splitSlug: string;
  daySlug: string;
  exerciseSlug: string;
}

export interface ExercisePageProps {
  params: {
    slug: string;
    daySlug: string;
    exerciseSlug: string;
  };
}

export interface ExerciseLogClientProps {
  user: AuthUser;
  day: Day;
  exercise: Exercise;
  splitSlug: string;
  daySlug: string;
  prevExercise: Exercise | null;
  nextExercise: Exercise | null;
}

export interface ExerciseRenderProps {
  splitSlug: string;
  daySlug: string;
  initialExercises: Exercise[];
}



export interface LogListProps {
  logs: ExerciseLog[];
  setLogs: React.Dispatch<React.SetStateAction<ExerciseLog[]>>;
}