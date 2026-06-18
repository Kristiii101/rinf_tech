"use client";

interface DeleteButtonProps {
  action: () => Promise<void>;
  employeeName: string;
}

export function DeleteButton({ action, employeeName }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete onboarding for ${employeeName}?`)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-600 border border-red-300 rounded-md px-3 py-1.5 hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
