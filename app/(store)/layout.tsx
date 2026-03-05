import ShoppingCart from "@/components/Cart/ShoppingCart";
import MobileCart from "@/components/Cart/MobileCart";
import MainNav from "@/components/ui/MainNav";
import ToastNotification from "@/components/ui/ToastNotifications";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MainNav />
            <main className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 pb-24 lg:pb-6">
                    {children}
                </div>
                <aside className="w-100 bg-surface-light border-l border-slate-200 hidden lg:flex flex-col shadow-2xl">
                    <ShoppingCart />
                </aside>
            </main>

            <MobileCart />
            <ToastNotification />
        </>
    );
}