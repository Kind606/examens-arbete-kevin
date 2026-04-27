// API Configuration
export const API_CONFIG = {
  HOST: "edb-with-videos-and-images-by-ascendapi.p.rapidapi.com",
  BASE_URL: "https://edb-with-videos-and-images-by-ascendapi.p.rapidapi.com",
  SEARCH_ENDPOINT: "/api/v1/exercises/search",
  DETAILS_ENDPOINT: "/api/v1/exercises",
} as const;

// Exercise ID Prefix
export const EXERCISE_ID_PREFIX = "ascend-" as const;

// Form Defaults
export const FORM_DEFAULTS = {
  SETS: 3,
  REPS: 10,
  DEBOUNCE_MS: 300,
  MIN_SEARCH_LENGTH: 2,
  MAX_RESULTS: 10,
} as const;

// Swedish to English translations for exercise search
export const EXERCISE_TRANSLATIONS: Record<string, string> = {
  // Body parts
  bröst: "chest",
  rygg: "back",
  ben: "legs",
  lår: "legs",
  axlar: "shoulders",
  armar: "arms",
  biceps: "biceps",
  triceps: "triceps",
  mage: "abs",
  buk: "abs",
  vader: "calves",
  rumpa: "glutes",
  gluteus: "glutes",

  // Exercises
  bänkpress: "bench",
  marklyft: "deadlift",
  knäböj: "squat",
  axelpress: "shoulder press",
  rodd: "row",
  chins: "chin",
  pullups: "pull",
  dips: "dip",

  // Equipment
  skivstång: "barbell",
  hantel: "dumbbell",
  kabel: "cable",
  maskin: "machine",
} as const;
