import OrderDetails from "@/components/adminView/OrderDetails";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";

const AdminOrder = () => {
  const [openDetailDialog , setopenDetailDialog] = useState(false)
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
                <Button onClick ={()=>setopenDetailDialog(true)} >View details</Button>
                <OrderDetails />


                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
       
         
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrder;
