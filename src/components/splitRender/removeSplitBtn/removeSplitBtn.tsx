"use client";

import { useRemoveSplit } from "./removeSplitBtnHook";

interface RemoveSplitBtnProps {
  splitId: string;
  style?: React.CSSProperties;
}

export default function RemoveSplitBtn({ splitId, style }: RemoveSplitBtnProps) {
  const { removeSplit } = useRemoveSplit();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    removeSplit(splitId);
  };

  return <button style={style} onClick={handleClick}>Delete</button>;
}
