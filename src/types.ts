export type User = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: string;
  username: string;
  token: string;
};

export { ExerciseType } from "@/generated/prisma/client";

export type SetData = {
  // Strength fields
  reps: number | null;
  weight: number | null;

  // Cardio fields
  time: number | null;
  distance: number | null; 
};

export type ExerciseLog = {
  id: string;
  exerciseId: string;
  sets: SetData[];
  comment?: string | null;
  createdAt: Date;
};

export type Exercise = {
  id: string;
  name: string;
  slug: string;
  exerciseType: import("@/generated/prisma/client").$Enums.ExerciseType;
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

export interface SplitRenderProps {
  userId: string;
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
  exercise: Exercise;
  logs: ExerciseLog[];
  setLogs: React.Dispatch<React.SetStateAction<ExerciseLog[]>>;
}

export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}
