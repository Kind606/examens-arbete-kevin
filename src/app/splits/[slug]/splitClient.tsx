"use client";

import { useHydrateAuth } from "@/src/hooks/useHydrateAuth";
import { AuthUser, Split } from "@/src/types";

interface SplitClientProps {
  user: AuthUser;
  split: Split;
}

export default function SplitClient({ user, split }: SplitClientProps) {
  useHydrateAuth(user);

  return (
    <div>
      <h1>{split.title}</h1>
      <p>Created at: {new Date(split.createdAt).toLocaleString()}</p>
    </div>
  );
}
