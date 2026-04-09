import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "管理画面 | you&me curry",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-5 sm:p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
