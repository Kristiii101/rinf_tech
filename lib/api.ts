import type { OnboardingRequest, OnboardingStatus, AuditLogEntry } from "@/types/onboarding";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  if (res.status === 204 || res.headers.get("content-length") === "0") return undefined as T;
  return res.json();
}

export function getOnboardingRequests(): Promise<OnboardingRequest[]> {
  return apiFetch("/onboarding");
}

export function getOnboardingRequest(id: string): Promise<OnboardingRequest> {
  return apiFetch(`/onboarding/${id}`);
}

export function getOnboardingByStatus(status: OnboardingStatus): Promise<OnboardingRequest[]> {
  return getOnboardingRequests().then((list) => list.filter((r) => r.status === status));
}

export function getAuditLog(requestId: string): Promise<AuditLogEntry[]> {
  return apiFetch(`/onboarding/${requestId}/audit`);
}
