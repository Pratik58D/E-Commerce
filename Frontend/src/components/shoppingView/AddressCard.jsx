import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const AddressCard = ({addressInfo ,handleDeleteAddress }) => {
  return (
    <Card >
        <CardContent className = "flex flex-col gap-3 pt-2">
            <Label>Address: {addressInfo?.address}</Label>
            <Label>City: {addressInfo?.city}</Label>
            <Label>Pincode : {addressInfo?.pincode}</Label>
            <Label>Phone:{addressInfo?.phone}</Label>
            <Label>Note:{addressInfo?.notes}</Label>

        </CardContent>
        <CardFooter className="flex p-3 justify-between ">
          <Button>Edit</Button>
          <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>

        </CardFooter>
    </Card>
  )
}

export default AddressCard;