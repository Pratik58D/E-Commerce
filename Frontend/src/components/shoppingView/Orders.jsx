import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import ShopOrderDetails from "./ShopOrderDetails";

const ShoppingOrders = () => {
    const [openDetailDialog , setopenDetailDialog] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>asojv</TableCell>
              <TableCell>gjae</TableCell>
              <TableCell>gjkd</TableCell>
              <TableCell>gjkd</TableCell>
              <TableCell>
                <Dialog open={openDetailDialog} onOpenChange={setopenDetailDialog}>
                <Button onClick ={()=>setopenDetailDialog(true)}>View details</Button>
                <ShopOrderDetails />


                </Dialog>
               
              </TableCell>
            </TableRow>
          </TableBody>
       
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
