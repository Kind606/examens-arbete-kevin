"use client";

import { useState } from "react";
import styles from "./addSplitBtn.module.css";
import { useAddSplit } from "./addSplitBtnHook";

export default function AddSplitBtn() {
  const { addSplit } = useAddSplit();
  const [showPopover, setShowPopover] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = async () => {
    if (!newTitle.trim()) return;

    await addSplit(newTitle.trim());
    setNewTitle("");
    setShowPopover(false);
  };

  const handleCancel = () => {
    setNewTitle("");
    setShowPopover(false);
  };

  return (
    <>
      <button className={styles.addButton} onClick={() => setShowPopover(true)}>Add Split</button>

      {showPopover && (
        <div className={styles.overlay} onClick={handleCancel}>
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Enter split name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div style={{ marginTop: "8px" }}>
              <button onClick={handleAdd} style={{ marginRight: 8 }}>
                Add
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
