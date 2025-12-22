"use client";

import Image from "next/image";
import styles from "../addSplitbtn/addSplitBtn.module.css";
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
        <div
          className={styles.overlay}
          onClick={(e) => {
            e.stopPropagation();
            handleCancel();
          }}
        >
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <input
              aria-label="Ny split title"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div className={styles.buttonGroup}>
              <button onClick={handleSave} className={styles.popaddButton}>
                Save
              </button>
              <button onClick={handleCancel} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
