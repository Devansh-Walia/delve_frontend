import Logout from "@/components/shared/buttons/logout";
import SidePanel from "@/components/shared/sidePanel";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const DashBoardNavItems = [
    {
      name: "explore",
      icon: null,
    },
    {
      name: "following",
      icon: null,
    },
    {
      name: "my pages",
      icon: null,
    },
    {
      name: "analytics",
      icon: null,
    },
  ];

  return (
    <div className="flex flex-col bg-primary sm:flex-row sm:min-h-screen">
      <aside className="w-full sm:w-56 sm:border-r-2 flex flex-col justify-between">
        <div className="w-full flex sm:flex-col justify-center">
          <SidePanel pathname="/dashboard" navItems={DashBoardNavItems} />
        </div>

        <div className="p-4 hidden sm:block">
          <Logout />
        </div>
      </aside>

      <main className="flex-1 px-6 py-10">{children}</main>
    </div>
  );
};

export default Layout;
