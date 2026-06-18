"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PAGE_SIZE } from "@/lib/constants";

interface PaginationProps {
  total: number;
  page: number;
}

export function Pagination({ total, page }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const go = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p === 1) params.delete("page");
    else params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages} · {total} total
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => go(p)}
            className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${
              p === page
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => go(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

