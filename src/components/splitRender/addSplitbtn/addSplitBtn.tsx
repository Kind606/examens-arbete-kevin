"use client";

import styles from "./addSplitBtn.module.css";
import { useAddSplit } from "./addSplitBtnHook";

export default function AddSplitBtn() {
  const {
    showPopover,
    newTitle,
    setNewTitle,
    openPopover,
    handleAdd,
    handleCancel,
  } = useAddSplit();

  return (
    <>
      <button className={styles.addButton} onClick={openPopover}>
        Lägg till split
      </button>

      {showPopover && (
        <div className={styles.overlay} onClick={handleCancel}>
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <input
              aria-label="Split Title"
              type="text"
              placeholder="Enter split name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div className={styles.buttonGroup}>
              <button onClick={handleAdd} className={styles.popaddButton}>
                Lägg till
              </button>
              <button onClick={handleCancel} className={styles.cancelButton}>
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
