import { EXERCISE_ID_PREFIX, EXERCISE_TRANSLATIONS } from "./constants";

/**
 * Translates Swedish search query to English
 */
export function translateQuery(query: string): string {
  const normalized = query.toLowerCase().trim();
  return EXERCISE_TRANSLATIONS[normalized] || query;
}

/**
 * Extracts exercise ID from external ID format (e.g., "ascend-exr_123" -> "exr_123")
 */
export function parseExerciseId(externalId: string): string {
  return externalId.replace(EXERCISE_ID_PREFIX, "");
}

/**
 * Creates external ID from exercise ID
 */
export function createExternalId(exerciseId: string): string {
  return `${EXERCISE_ID_PREFIX}${exerciseId}`;
}

/**
 * Determines the best media URL (prioritizes video over image)
 */
export function getMediaUrl(videoUrl?: string, imageUrl?: string): string {
  return videoUrl || imageUrl || "";
}

/**
 * Detects video file type from URL
 */
export function getVideoType(url: string): "mp4" | "gif" | "youtube" | null {
  if (/\.mp4$/i.test(url)) return "mp4";
  if (/\.(gif|jpg|jpeg|png|webp)$/i.test(url)) return "gif";
  if (/(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(url)) return "youtube";
  return null;
}

/**
 * Extracts YouTube video ID and returns embed URL
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
