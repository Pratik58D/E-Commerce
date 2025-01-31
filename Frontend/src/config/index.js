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
      id : "dashboard",
      label : "Dashboard",
      path : "/admin/dashboard",
    },
    {
      id : "products",
      label : "Products",
      path : "/admin/products",
    },
    {
      id : "orders",
      label : "Orders",
      path : "/admin/orders",
    }

  ]