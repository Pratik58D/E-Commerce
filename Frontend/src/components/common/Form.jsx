import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const Form = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  return (
    <form onSubmit={onSubmit} >
      <div className="flex flex-col gap-3">
        {formControls.map((formControl) => (
          <div className="flex flex-col gap-1" key={formControl.name}>
            <Label className="mb-1">{formControl.label}</Label>

            {/* for input type */}
            {formControl.componentType === "input" && (
              <Input
                type={formControl.type}
                name={formControl.name}
                placeholder={formControl.placeHolder}
                id={formControl.name}
                value={formData[formControl.name]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [formControl.name]: e.target.value,
                  })
                }
              />
            )}
            {/* for select type */}
            {formControl.componentType === "select" && (
              <Select
                name={formControl.name}
                value={formData[formControl.name]}
                onValueChange={(value) =>
                  setFormData({ ...formData, [formControl.name]: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={formControl.placeHolder} />
                </SelectTrigger>
                <SelectContent>
                  {formControl.options &&
                    formControl.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}

            {/* for textarea type */}

            {formControl.componentType === "textarea" && (
              <Textarea
                name={formControl.name}
                placeholder={formControl.placeHolder}
                rows="4"
                value={formData[formControl.name]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [formControl.name]: e.target.value,
                  })
                }
              />
            )}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4 w-full bg-blue-900">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default Form;
