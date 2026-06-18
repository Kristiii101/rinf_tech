"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export function CollapsibleEdit({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
      >
        <span>Edit &amp; Resubmit</span>
        <span className="text-gray-400 text-lg leading-none">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}
