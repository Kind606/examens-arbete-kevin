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
    register,
    handleSubmit,
    errors,
    openPopover,
    onSubmit,
    handleCancel,
    validateSplitName,
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                aria-label="Ny split title"
                type="text"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 1,
                    message: "Title must be at least 1 character",
                  },
                  validate: (value) => validateSplitName(value),
                })}
                autoFocus
              />
              {errors.title && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.title.message}
                </p>
              )}
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.popaddButton}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
