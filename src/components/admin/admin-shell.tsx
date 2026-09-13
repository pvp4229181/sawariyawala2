"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Mail,
  PackageOpen,
} from "lucide-react";
export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname(),
    router = useRouter();
  const links = [
    ["/admin", LayoutDashboard, "Overview"],
    ["/admin/products", PackageOpen, "Products"],
    ["/admin/orders", ClipboardList, "Orders"],
    ["/admin/contacts", Mail, "Messages"],
  ] as const;
  return (
    <div className="admin-layout">
      <aside>
        <Link href="/" className="admin-wordmark">
          SW<span>Admin</span>
        </Link>
        <nav>
          {links.map(([href, Icon, label]) => (
            <Link
              key={href}
              href={href}
              className={path === href ? "active" : ""}
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
        >
          <LogOut />
          Sign out
        </button>
      </aside>
      <main>{children}</main>
    </div>
  );
}
