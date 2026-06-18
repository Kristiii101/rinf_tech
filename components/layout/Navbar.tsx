import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/onboarding/new", label: "New Request" },
  { href: "/manager", label: "Manager" },
  { href: "/finance", label: "Finance" },
  { href: "/it", label: "IT" },
];

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-indigo-600 font-semibold text-sm">
            Onboarding System
          </Link>
          <div className="flex gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
