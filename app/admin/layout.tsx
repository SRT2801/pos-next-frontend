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
      <div className="lg:min-h-screen container mx-auto mt-4 sm:mt-10 px-4 sm:px-6 lg:px-0">
        <div className="bg-white shadow w-full mx-auto p-4 sm:p-6 lg:p-10 my-4 sm:my-10 lg:w-3/5 rounded-lg" >
          {children}
        </div>
      </div>
      <ToastNotifications />
    </AdminGuard>
  );
}