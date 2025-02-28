import { Home, LogOutIcon, LucideShoppingCart, Menu, UserCog2 } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {logOut} from "@/store/auth-slice/index"
import UserCartWrapper from "./CartWrapper";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          className="text-sm font-medium  capitalize hover:text-slate-500"
        > 
      
          {menuItem.label}       
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const {user} = useSelector(state =>state.auth);
  const[openCartSheet , setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  function logOutUser (){
    dispatch(logOut())
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open ={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}  >
      <Button onClick={()=>setOpenCartSheet(true)} variant="outline" size="icon">
        <LucideShoppingCart size={6} />
        <span className="sr-only">User Cart</span>
      </Button>
      <UserCartWrapper />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black rounded-full w-8 h-8 ">
            <AvatarFallback className="bg-black text-white font-extrabold ">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick = {()=>navigate("/shop/account")} >
            <UserCog2 className="mr-2 h-4 w-4"/>
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logOutUser}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          LogOut
          </DropdownMenuItem>
            
        

        </DropdownMenuContent>
      
      </DropdownMenu>
    </div>
  );
}

const ShopHeader = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  // console.log(user);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          <span className="font-bold">E-Commerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

     
          <div className="hidden lg:block">
            <HeaderRightContent  />
          </div>
        
      </div>
    </header>
  );
};

export default ShopHeader;
