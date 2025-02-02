import { adminSidebarMenuItems } from "@/config";
import { ChartNoAxesCombinedIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

// sidebar menu component
function MenuItems({setOpen}) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          className="flex text-xl items-center gap-2 rounded-md px-5 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path)
            setOpen ? setOpen(false) : null;
          
          }}
        >
          {menuItem.label}
          <menuItem.icon size={20} />
        </div>
      ))}
    </nav>
  );
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full ">
            <SheetHeader className="border-b">
              <SheetTitle className = "flex gap-2">
                <ChartNoAxesCombinedIcon size={30} />
                <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen= {setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden lg:flex flex-col border-r bg-background w-64">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex justify-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombinedIcon size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
