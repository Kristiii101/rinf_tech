import Link from "next/link";

const roles = [
  { href: "/dashboard", label: "Dashboard", desc: "View all onboarding requests", color: "bg-indigo-50 border-indigo-200 hover:border-indigo-400" },
  { href: "/onboarding/new", label: "HR — New Request", desc: "Submit a new employee onboarding", color: "bg-green-50 border-green-200 hover:border-green-400" },
  { href: "/manager", label: "Manager Review", desc: "Approve or reject pending profiles", color: "bg-yellow-50 border-yellow-200 hover:border-yellow-400" },
  { href: "/finance", label: "Finance Approval", desc: "Approve Premium hardware budgets", color: "bg-blue-50 border-blue-200 hover:border-blue-400" },
  { href: "/it", label: "IT Provisioning", desc: "Set up accounts and laptop config", color: "bg-purple-50 border-purple-200 hover:border-purple-400" },
];

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Employee Onboarding System</h1>
      <p className="text-gray-500 mb-8">Select your role to continue.</p>
      <div className="grid gap-4">
        {roles.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className={`block border rounded-lg px-5 py-4 transition-colors ${r.color}`}
          >
            <p className="font-semibold text-gray-800">{r.label}</p>
            <p className="text-sm text-gray-500 mt-0.5">{r.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
