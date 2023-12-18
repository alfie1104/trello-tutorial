"use client";

import { forwardRef } from "react";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    return <div className="pt-2 px-2">Card Form</div>;
  }
);

CardForm.displayName = "CardForm";
