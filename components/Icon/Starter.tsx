import React from "react";
import { SVGProps } from "react";

export type TSVGElementProps = SVGProps<SVGSVGElement>;

const StarterIcon: React.FC<TSVGElementProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="138"
      height="138"
      fill="none"
      viewBox="0 0 138 138"
      {...props}
    >
      <rect
        width="123"
        height="123"
        x="8"
        y="8"
        fill="#1447E6"
        rx="61.5"
      ></rect>
      <rect
        width="87"
        height="87"
        x="26"
        y="26"
        fill="#2B7FFF"
        rx="43.5"
      ></rect>
      <rect width="61" height="61" x="39" y="39" fill="#fff" rx="30.5"></rect>
    </svg>
  );
};

export default StarterIcon;
