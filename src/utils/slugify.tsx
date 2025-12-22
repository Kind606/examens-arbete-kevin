export function slugify(name: string): string {
  const map: Record<string, string> = {
    å: "a",
    ä: "a",
    ö: "o",
    Å: "a",
    Ä: "a",
    Ö: "o",
  };

  return name
    .toLowerCase()
    .replace(/[åäöÅÄÖ]/g, (match) => map[match] || match)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
