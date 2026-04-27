"use server";

import { prisma } from "@/src/lib/prisma";
import { API_CONFIG, FORM_DEFAULTS } from "./constants";
import { createExternalId, translateQuery } from "./utils";

export interface ExerciseSearchResult {
  externalId: string;
  name: string;
  category?: string;
  muscleGroup?: string;
  equipment?: string;
  videoUrl?: string;
  imageUrl?: string;
}

interface ExerciseDBExercise {
  exerciseId: string;
  name: string;
  imageUrl: string;
}

export async function searchExercisesAction(
  query: string,
): Promise<ExerciseSearchResult[]> {
  if (!query || query.trim().length < FORM_DEFAULTS.MIN_SEARCH_LENGTH) {
    return [];
  }

  try {
    const translatedQuery = translateQuery(query);
    const searchTerm = translatedQuery.toLowerCase();

    const cached = await prisma.exerciseTemplate.findMany({
      where: {
        OR: [
          { name: { contains: translatedQuery, mode: "insensitive" } },
          { category: { contains: translatedQuery, mode: "insensitive" } },
          { muscleGroup: { contains: translatedQuery, mode: "insensitive" } },
        ],
      },
      take: FORM_DEFAULTS.MAX_RESULTS,
    });

    if (cached.length > 0) {
      return cached.map((ex) => ({
        externalId: ex.externalId,
        name: ex.name,
        category: ex.category ?? undefined,
        muscleGroup: ex.muscleGroup ?? undefined,
        equipment: ex.equipment ?? undefined,
        videoUrl: ex.videoUrl ?? undefined,
        imageUrl: ex.imageUrl ?? undefined,
      }));
    }

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.SEARCH_ENDPOINT}?search=${encodeURIComponent(searchTerm)}`,
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
        `ExerciseDB API failed: ${response.status} - ${response.statusText}`,
      );
      console.error(
        "Subscribe to AscendAPI at: https://rapidapi.com/ascendapi/api/edb-with-videos-and-images-by-ascendapi",
      );
      return [];
    }

    const json = await response.json();
    if (!json.success || !json.data) {
      return [];
    }

    const data: ExerciseDBExercise[] = json.data;

    const exercises: ExerciseSearchResult[] = data
      .slice(0, FORM_DEFAULTS.MAX_RESULTS)
      .map((ex) => ({
        externalId: createExternalId(ex.exerciseId),
        name: ex.name,
        imageUrl: ex.imageUrl,
      }));

    if (exercises.length > 0) {
      Promise.allSettled(
        exercises.map((ex) =>
          prisma.exerciseTemplate.upsert({
            where: { externalId: ex.externalId },
            create: ex,
            update: ex,
          }),
        ),
      ).catch(console.error);
    }

    return exercises;
  } catch (error) {
    console.error("Error searching exercises:", error);
    return [];
  }
}
