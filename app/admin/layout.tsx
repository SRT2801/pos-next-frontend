import AdminNavClient from "@/components/ui/AdminNavClient";
import ToastNotifications from "@/components/ui/ToastNotifications";
import { AdminGuard } from "@/components/ui/RouteGuards";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminGuard>
      <AdminNavClient />
      <main className="min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {children}
      </main>
      <ToastNotifications />
    </AdminGuard>
  );
}