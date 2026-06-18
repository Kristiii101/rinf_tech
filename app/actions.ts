"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import type { OnboardingRequest } from "@/types/onboarding";

export async function createOnboarding(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  try {
    const body = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      role: formData.get("role"),
      startDate: formData.get("startDate"),
      hardwareTier: formData.get("hardwareTier"),
      isUrgent: formData.get("isUrgent") === "on",
    };
    await apiFetch<OnboardingRequest>("/onboarding", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch {
    return { error: "Failed to create onboarding request." };
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateOnboarding(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  try {
    const body = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      role: formData.get("role"),
      startDate: formData.get("startDate"),
      hardwareTier: formData.get("hardwareTier"),
      isUrgent: formData.get("isUrgent") === "on",
    };
    await apiFetch<OnboardingRequest>(`/onboarding/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  } catch {
    return { error: "Failed to update onboarding request." };
  }
  revalidatePath("/dashboard");
  revalidatePath(`/onboarding/${id}`);
  redirect("/dashboard");
}

export async function managerApprove(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const approvalNote = formData.get("approvalNote") as string | null;
  try {
    await apiFetch(`/onboarding/${id}/manager/approve`, {
      method: "PATCH",
      body: JSON.stringify({ approvalNote: approvalNote || undefined }),
    });
  } catch {
    return { error: "Failed to approve request." };
  }
  revalidatePath("/manager");
  revalidatePath("/dashboard");
  return {};
}

export async function managerReject(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const rejectionReason = formData.get("rejectionReason");
  if (!rejectionReason) return { error: "Rejection reason is required." };
  try {
    await apiFetch(`/onboarding/${id}/manager/reject`, {
      method: "PATCH",
      body: JSON.stringify({ rejectionReason }),
    });
  } catch {
    return { error: "Failed to reject request." };
  }
  revalidatePath("/manager");
  revalidatePath("/dashboard");
  return {};
}

export async function financeApprove(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const approvalNote = formData.get("approvalNote") as string | null;
  try {
    await apiFetch(`/onboarding/${id}/finance/approve`, {
      method: "PATCH",
      body: JSON.stringify({ approvalNote: approvalNote || undefined }),
    });
  } catch {
    return { error: "Failed to approve request." };
  }
  revalidatePath("/finance");
  revalidatePath("/dashboard");
  return {};
}

export async function financeReject(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const rejectionReason = formData.get("rejectionReason");
  if (!rejectionReason) return { error: "Rejection reason is required." };
  try {
    await apiFetch(`/onboarding/${id}/finance/reject`, {
      method: "PATCH",
      body: JSON.stringify({ rejectionReason }),
    });
  } catch {
    return { error: "Failed to reject request." };
  }
  revalidatePath("/finance");
  revalidatePath("/dashboard");
  return {};
}

export async function itProvision(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const generatedEmail = formData.get("generatedEmail");
  const generatedPassword = formData.get("generatedPassword");
  const laptopConfig = formData.get("laptopConfig");
  if (!generatedEmail || !generatedPassword || !laptopConfig) return { error: "Email, password and laptop config are required." };
  try {
    await apiFetch(`/onboarding/${id}/it/provision`, {
      method: "PATCH",
      body: JSON.stringify({ generatedEmail, generatedPassword, laptopConfig }),
    });
  } catch {
    return { error: "Failed to provision." };
  }
  revalidatePath("/it");
  revalidatePath("/dashboard");
  return {};
}

export async function itReject(
  id: string,
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const rejectionReason = formData.get("rejectionReason");
  if (!rejectionReason) return { error: "Rejection reason is required." };
  try {
    await apiFetch(`/onboarding/${id}/it/reject`, {
      method: "PATCH",
      body: JSON.stringify({ rejectionReason }),
    });
  } catch {
    return { error: "Failed to reject." };
  }
  revalidatePath("/it");
  revalidatePath("/dashboard");
  return {};
}

export async function deleteOnboarding(id: string): Promise<void> {
  await apiFetch(`/onboarding/${id}`, { method: "DELETE" });
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

