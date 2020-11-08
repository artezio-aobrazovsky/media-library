import React, { FunctionComponent, useEffect } from "react";

import classes from "./input.module.scss";

interface InputProps {
  label?: string;
  value?: string;
  type?: string;
  onChange?: (value: string) => void;
}

const Input: FunctionComponent<InputProps> = (props) => {
  const { label, value, type = "text", onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <label className={classes.inputWrapper}>
      <span className={classes.labelText}>{label}</span>
      <input type={type} value={value} onChange={handleChange} />
    </label>
  );
};

export default Input;
