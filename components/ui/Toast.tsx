"use client";

import { createContext, useContext, useReducer, useCallback, useEffect } from "react";

type ToastType = "success" | "error";
interface Toast { id: number; message: string; type: ToastType }
type Action =
  | { type: "ADD"; toast: Toast }
  | { type: "REMOVE"; id: number };

const ToastContext = createContext<{
  showToast: (message: string, type?: ToastType) => void;
} | null>(null);

let nextId = 1;

function reducer(state: Toast[], action: Action): Toast[] {
  if (action.type === "ADD") return [...state, action.toast];
  return state.filter((t) => t.id !== action.id);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = nextId++;
    dispatch({ type: "ADD", toast: { id, message, type } });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDone={() => dispatch({ type: "REMOVE", id: t.id })} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDone }: { toast: Toast; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3500);
    return () => clearTimeout(timer);
  }, [onDone]);

  const base = "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-right";
  const styles = toast.type === "success"
    ? `${base} bg-green-600 text-white`
    : `${base} bg-red-600 text-white`;

  return (
    <div className={styles}>
      <span>{toast.type === "success" ? "✓" : "✕"}</span>
      <span>{toast.message}</span>
      <button onClick={onDone} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
