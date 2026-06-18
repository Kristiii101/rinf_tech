"use client";

import { useState } from "react";
import { formatDate } from "@/lib/formatDate";
import type { OnboardingRequest } from "@/types/onboarding";

interface FisaDePostProps {
  request: OnboardingRequest;
}

export function FisaDePost({ request }: FisaDePostProps) {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    const printContent = document.getElementById("fisa-de-post-print");
    if (!printContent) return;
    const win = window.open("", "_blank", "width=800,height=900");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Fișă de Post — ${request.firstName} ${request.lastName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #111; }
            h1 { font-size: 22px; margin-bottom: 4px; }
            .subtitle { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 24px; }
            hr { border: none; border-top: 1px solid #ddd; margin: 16px 0; }
            .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; }
            .label { color: #555; font-weight: 600; }
            .section-title { font-size: 13px; font-weight: 600; color: #555; margin: 16px 0 8px; }
            ul { margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.7; }
            .footer { margin-top: 32px; font-size: 11px; color: #aaa; text-align: right; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  const docContent = (
    <div id="fisa-de-post-print">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Fișă de Post</p>
      <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">{request.firstName} {request.lastName}</h2>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="font-medium text-gray-500">Funcție / Role</dt>
          <dd className="text-gray-900">{request.role}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-500">Data începerii</dt>
          <dd className="text-gray-900">{formatDate(request.startDate)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-500">Echipament solicitat</dt>
          <dd className="text-gray-900">{request.hardwareTier}</dd>
        </div>
        <div className="pt-4 border-t">
          <dt className="font-medium text-gray-500 mb-2">Responsabilități principale</dt>
          <dd className="text-gray-700 space-y-1">
            <p>• Îndeplinirea atribuțiilor specifice funcției de <strong>{request.role}</strong>.</p>
            <p>• Respectarea regulamentului intern și a procedurilor companiei.</p>
            <p>• Colaborarea cu echipele interdepartamentale pentru atingerea obiectivelor.</p>
            <p>• Participarea la procesele de onboarding și training inițial.</p>
          </dd>
        </div>
        <div className="pt-4 border-t">
          <dt className="font-medium text-gray-500 mb-2">Condiții de muncă</dt>
          <dd className="text-gray-700">
            <p>• Program de lucru: full-time.</p>
            <p>• Echipament IT: {request.hardwareTier === "Premium" ? "Pachet Premium (laptop de înaltă performanță)." : "Pachet Standard."}</p>
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs text-gray-400 text-right">
        Document generat automat — {formatDate(request.startDate)}
      </p>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-indigo-600 underline hover:text-indigo-800"
      >
        View Fișa de post
      </button>

      {/* hidden element used as print source */}
      <div className="hidden">{docContent}</div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-8 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ✕
            </button>

            <button
              onClick={handleDownload}
              className="absolute top-4 right-12 text-xs text-indigo-600 border border-indigo-300 rounded px-2 py-1 hover:bg-indigo-50 transition-colors"
            >
              ↓ PDF
            </button>

            {docContent}
          </div>
        </div>
      )}
    </>
  );
}
