"use client";

import { useTransition } from "react";
import { useToast } from "@/components/ui/Toast";

interface DeleteButtonProps {
  action: () => Promise<void>;
  employeeName: string;
}

export function DeleteButton({ action, employeeName }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleClick = () => {
    if (!confirm(`Delete onboarding for ${employeeName}?`)) return;
    startTransition(async () => {
      try {
        await action();
        showToast(`${employeeName} deleted successfully.`, "success");
      } catch {
        showToast("Failed to delete. Please try again.", "error");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="text-sm text-red-600 border border-red-300 rounded-md px-3 py-1.5 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
