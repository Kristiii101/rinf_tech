"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface DeleteButtonProps {
  action: () => Promise<void>;
  employeeName: string;
}

export function DeleteButton({ action, employeeName }: DeleteButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const router = useRouter();

  const handleConfirm = () => {
    setShowModal(false);
    startTransition(async () => {
      try {
        await action();
        showToast(`${employeeName} deleted successfully.`, "success");
        router.push("/dashboard");
      } catch {
        showToast("Failed to delete. Please try again.", "error");
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        disabled={isPending}
        className="text-sm text-red-600 border border-red-300 rounded-md px-3 py-1.5 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Deleting…" : "Delete"}
      </button>

      {showModal && (
        <ConfirmModal
          title="Delete onboarding request"
          message={`Are you sure you want to delete the onboarding for ${employeeName}? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
}
