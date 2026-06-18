"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

function generatePassword() {
  return Array.from({ length: 6 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
}

interface ITProvisionFormProps {
  provisionAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  rejectAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  defaultEmail?: string | null;
  defaultPassword?: string | null;
  defaultLaptopConfig?: string | null;
  suggestedEmail?: string;
}

export function ITProvisionForm({ provisionAction, rejectAction, defaultEmail, defaultPassword, defaultLaptopConfig, suggestedEmail }: ITProvisionFormProps) {
  const [showReject, setShowReject] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState(defaultPassword ?? "");
  const [email, setEmail] = useState(defaultEmail ?? suggestedEmail ?? "");
  const { showToast } = useToast();

  const handleProvision = (formData: FormData) => {
    startTransition(async () => {
      const result = await provisionAction(null, formData);
      if (result?.error) showToast(result.error, "error");
      else showToast("Provisioning completed successfully.", "success");
    });
  };

  const handleReject = (formData: FormData) => {
    startTransition(async () => {
      const result = await rejectAction(null, formData);
      if (result?.error) showToast(result.error, "error");
      else showToast("Request sent back for rework.", "success");
    });
  };

  if (showReject) {
    return (
      <form action={handleReject} className="space-y-2">
        <textarea
          name="rejectionReason"
          placeholder="Reason for rejection…"
          required
          rows={2}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <div className="flex gap-2">
          <Button type="submit" variant="danger" pendingLabel="Rejecting…" disabled={isPending}>
            Confirm Reject
          </Button>
          <Button type="button" variant="secondary" onClick={() => setShowReject(false)} disabled={isPending}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form action={handleProvision} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Generated Email</label>
        <input
          name="generatedEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="firstname.lastname@rinf.tech"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Generated Password</label>
        <input
          name="generatedPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="e.g. Onb0arding#2026"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={() => setPassword(generatePassword())}
          className="mt-1.5 text-xs text-indigo-600 hover:text-indigo-800 underline"
        >
          Generate password
        </button>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Laptop Configuration</label>
        <input
          name="laptopConfig"
          defaultValue={defaultLaptopConfig ?? ""}
          placeholder="e.g. MacBook Pro 16 / Dell XPS 15"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" pendingLabel="Provisioning…" disabled={isPending}>
          Complete Provisioning
        </Button>
        <Button type="button" variant="danger" onClick={() => setShowReject(true)} disabled={isPending}>
          Reject
        </Button>
      </div>
    </form>
  );
}
