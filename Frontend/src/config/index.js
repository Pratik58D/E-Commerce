import { BadgeCheck, LayoutDashboardIcon, ShoppingBasket } from "lucide-react";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeHolder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeHolder: "Enter your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeHolder: "enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeHolder: "Enter your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeHolder: "enter your password",
    componentType: "input",
    type: "password",
  },
];

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/product",
    icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/order",
    icon: BadgeCheck,
  },
];

export const addProductsFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeHolder: "Enter the Product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",
    placeHolder: "Enter the Product decription",
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "reebok", label: "Reebok" },
      { id: "under_armour", label: "Under Armour" },
    ],
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeHolder: "0",
  },
  {
    label: "SalesPrice",
    name: "salesPrice",
    componentType: "input",
    type: "number",
    placeHolder: "0",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeHolder: "Enter the total Stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "footwear",
    path: "/shop/listing",
  },
];

//used in product filtering
export const filterOption = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "reebok", label: "Reebok" },
    { id: "zara", label: "Zara" },
    { id: "goldStar", label: "goldStar" },
  ],
};

export const sortOptions = [
  { id: "price-low-high", label: "Low To High" },
  { id: "price-high-low", label: "High To Low" },
  { id: "a-z", label: "A-Z" },
  { id: "z-a", label: "z-a" },
];
