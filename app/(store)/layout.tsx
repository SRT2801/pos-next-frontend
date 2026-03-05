import ShoppingCart from "@/components/Cart/ShoppingCart";
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
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {children}
                </div>
                <aside className="w-[400px] bg-surface-light border-l border-slate-200 flex flex-col shadow-2xl hidden lg:flex">
                    <ShoppingCart />
                </aside>
            </main>

            <ToastNotification />
        </>
    );
}