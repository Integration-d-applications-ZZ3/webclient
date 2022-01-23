import React from "react";

type InputValueType = string | number; 
const useFormInput = (initialValue: InputValueType, isInteger = false) => {
  const [value, setValue] = React.useState<InputValueType>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isInteger) {
      const parsedValue = parseInt(e.target.value);
      setValue(isNaN(parsedValue) ? initialValue : parsedValue);
    } else {
      setValue(e.target.value);
    }
  };

  return {
    value,
    onChange: handleChange
  };
};

export default useFormInput;
