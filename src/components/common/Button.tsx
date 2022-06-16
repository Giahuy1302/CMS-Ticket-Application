import { Button as AButton, ButtonProps } from "antd";
import React from "react";

interface Props {
  children: React.ReactNode;
  type?: "default" | "primary";
  width?: string;
  padding?: string;
  margin?: string;
}

const Button = ({
  children,
  type = "default",
  width = "160px",
  padding = "0px",
  margin = "0px",
  ...rest
}: Props & ButtonProps) => {
  return (
    <AButton
      type={type}
      style={
        type === "default"
          ? {
              width: width,
              background: "#FFFFFF",
              border: "1px solid #FF993C",
              color: "#FF993C",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: padding,
              margin: margin,
              height: "48px",
            }
          : {
              width: width,
              background: "#FF993C",
              border: "1px solid #FF993C",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: padding,
              margin: margin,
              height: "48px",
            }
      }
      {...rest}
    >
      {children}
    </AButton>
  );
};

export default Button;
