import { filterOption } from "@/config";
import React, { Fragment } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ProductFilter = ({filters , handleFilter}) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOption).map((keyItem) => (
            <Fragment key={keyItem} >
          <div >
            <h3 className="text-base font-semibold">{keyItem}</h3>
            <div className="grid gap-2 mt-2">
              {filterOption[keyItem].map((option) => (
                <Label className="flex items-center gap-2 font-medium" key={option.id}>
                  <Checkbox
                  checked ={
                    filters && Object.keys(filters).length > 0 && 
                    filters[keyItem] && filters[keyItem].indexOf(option.id) > -1

                  }
                  onCheckedChange = {()=> handleFilter(keyItem , option.id)} />
                  {option.label}
                </Label>
              ))}
            </div>
          </div>
          <Separator />
          </Fragment>
          
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
