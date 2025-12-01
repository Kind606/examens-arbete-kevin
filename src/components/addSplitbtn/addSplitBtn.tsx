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

    await addSplit(newTitle);
    setNewTitle("");
    setShowPopover(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setShowPopover(true)}>Add Split</button>

      {showPopover && (
        <div className={styles.popover}>
          <input
            type="text"
            placeholder="Enter split name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div style={{ marginTop: "8px" }}>
            <button onClick={handleAdd} style={{ marginRight: 8 }}>
              Add
            </button>
            <button onClick={() => setShowPopover(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
