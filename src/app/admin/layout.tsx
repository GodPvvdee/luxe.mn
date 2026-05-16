import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-muted/30 min-h-screen">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        <AdminTopbar />
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
