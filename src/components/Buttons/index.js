import React from "react";
import { Button } from "antd";

const ActionButton = ({
  wrapper,
  shape,
  type,
  children,
  icon,
  loading,
  size,
  htmlType,
  ...props
}) => {
  console.log(props);
  console.log(wrapper);

  const TYPE_BUTTON = {
    primary: "!bg-[#539092] !text-white !border-transparent",
    secondary: "!bg-[#015349] !text-white !border-transparent",
    success: "!bg-[#5CB85C] !text-white !border-transparent",
    info: "!bg-[#C0E2FD] !text-white !border-transparent",
    warning: "!bg-[#FEF8C6] !text-black !border-transparent",
    error: "!bg-[#FCCBC7] !text-white !border-transparent",
    "primary-border": "!bg-transparent !border-[#539092]",
  };

  const SIZE_BUTTON = {
    large: "large",
    middle: "middle",
    small: "small",
  };

  const SHAPE_BUTTON = {
    default: "default",
    circle: "circle",
    round: "round",
  };

  const typeButton = TYPE_BUTTON[type || "primary"];
  const sizeButton = SIZE_BUTTON[size || "default"];
  const shapeButton = SHAPE_BUTTON[shape || "primary"];
  const classButton = wrapper ?? "";
  const isLoading = loading ?? false;
  const isSumbit = htmlType ?? "submit";

  return (
    <Button
      className={classButton + typeButton}
      icon={icon}
      shape={shapeButton}
      size={sizeButton}
      loading={isLoading}
      htmlType={isSumbit}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
