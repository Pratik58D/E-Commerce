import { adminSidebarMenuItems } from "@/config";
import { ChartNoAxesCombinedIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function MenuItems(){
  return <nav className="mt-8 flex flex-col gap-2">
    {
      adminSidebarMenuItems.map((menuItem)=>(
        <div>
          
        </div>

      )

      )
    }

  </nav>

}

const AdminSidebar = () => {

  const navigate = useNavigate()
  return (
    <>
    <aside className="hidden lg:flex flex-col border-r bg-background w-64">
      <div 
      onClick={()=> navigate("/admin/dashboard")}
      className="flex justify-center gap-2 cursor-pointer">
        <ChartNoAxesCombinedIcon size={30} />
        <h1 className="text-xl font-extrabold">Admin Panel</h1>

      </div>

    </aside>
    </>
 
  );
};

export default AdminSidebar;
