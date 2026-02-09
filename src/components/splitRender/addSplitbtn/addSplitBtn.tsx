"use client";

import styles from "./addSplitBtn.module.css";
import { useAddSplit } from "./addSplitBtnHook";

export default function AddSplitBtn() {
  const {
    showPopover,
    register,
    handleSubmit,
    errors,
    openPopover,
    onSubmit,
    handleCancel,
    validateSplitName,
  } = useAddSplit();

  return (
    <>
      <button className={styles.addButton} onClick={openPopover}>
        Lägg till split
      </button>

      {showPopover && (
        <div className={styles.overlay} onClick={handleCancel}>
          <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                aria-label="Split Title"
                type="text"
                placeholder="Enter split name"
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
                  Lägg till
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className={styles.cancelButton}
                >
                  Avbryt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
