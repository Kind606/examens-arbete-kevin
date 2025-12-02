"use client";

import Image from "next/image";
import styles from "./editSplitBtn.module.css";
import { useEditSplit } from "./editSplitBtnHook";

interface EditSplitBtnProps {
  splitId: string;
  currentTitle: string;
}

export default function EditSplitBtn({
  splitId,
  currentTitle,
}: EditSplitBtnProps) {
  const {
    showPopover,
    newTitle,
    setNewTitle,
    openPopover,
    handleSave,
    handleCancel,
  } = useEditSplit(splitId, currentTitle);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          openPopover();
        }}
        className={styles.button}
      >
        <Image src="/Edit.svg" alt="Edit" width={24} height={24} />
      </button>

      {showPopover && (
        <div className={styles.overlay} onClick={(e) => { e.stopPropagation(); handleCancel(); }}>
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div style={{ marginTop: 8 }}>
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
