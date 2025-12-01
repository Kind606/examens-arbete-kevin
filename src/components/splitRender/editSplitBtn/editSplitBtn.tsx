"use client";

import { useState } from "react";
import { useEditSplit } from "./editSplitBtnHook";
import styles from "./editSplitBtn.module.css";

interface EditSplitBtnProps {
  splitId: string;
  currentTitle: string;
}

export default function EditSplitBtn({ splitId, currentTitle }: EditSplitBtnProps) {
  const { editSplit } = useEditSplit();
  const [showPopover, setShowPopover] = useState(false);
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!newTitle.trim()) return;

    await editSplit(splitId, newTitle.trim());
    setShowPopover(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNewTitle(currentTitle);
    setShowPopover(false);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowPopover(true);
        }}
      >
        Edit
      </button>

      {showPopover && (
        <div className={styles.overlay} onClick={handleCancel}>
          <div
            className={styles.popover}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div style={{ marginTop: "8px" }}>
              <button onClick={handleSave} style={{ marginRight: 8 }}>
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
