"use server";

import { API_CONFIG } from "./constants";

export interface ExerciseDetails {
  exerciseId: string;
  name: string;
  imageUrl: string;
  videoUrl: string;
  bodyParts: string[];
  equipments: string[];
  targetMuscles: string[];
  secondaryMuscles: string[];
  exerciseType?: string;
  overview?: string;
  instructions?: string[];
}

export async function getExerciseDetailsAction(
  exerciseId: string,
): Promise<ExerciseDetails | null> {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.DETAILS_ENDPOINT}/${exerciseId}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
          "X-RapidAPI-Host": API_CONFIG.HOST,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch exercise details: ${response.status} - ${response.statusText}`,
      );
      return null;
    }

    const json = await response.json();
    if (!json.success || !json.data) {
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Error fetching exercise details:", error);
    return null;
  }
}
