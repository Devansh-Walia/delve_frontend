import Logout from "@/components/shared/buttons/logout";
import SidePanel from "@/components/shared/sidePanel";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const DashBoardNavItems = [
    {
      name: "users",
      icon: null,
      path: "/dashboard",
    },
    {
      name: "tables",
      icon: null,
      path: "/dashboard/tables",
    },
  ];

  return (
    <div className="flex flex-col w-full sm:flex-row h-full p-4 sm:p-0 bg-primary min-h-screen">
      <aside className="w-full sm:w-56 flex flex-col justify-between sm:m-4 rounded-2xl shadow-subtle">
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
