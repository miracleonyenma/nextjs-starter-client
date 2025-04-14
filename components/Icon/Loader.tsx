import React from "react";
import { SVGProps } from "react";

export type TSVGElementProps = SVGProps<SVGSVGElement>;

const LoaderIcon: React.FC<TSVGElementProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="267"
      height="267"
      fill="none"
      viewBox="0 0 267 267"
      {...props}
    >
      <path
        fill="currentColor"
        fillOpacity="0.3"
        d="M133.5 0C207.23 0 267 59.77 267 133.5c0 73.73-59.77 133.5-133.5 133.5C59.77 267 0 207.23 0 133.5 0 59.77 59.77 0 133.5 0zm0 226.95c51.611 0 93.45-41.839 93.45-93.45 0-51.611-41.839-93.45-93.45-93.45-51.611 0-93.45 41.839-93.45 93.45 0 51.611 41.839 93.45 93.45 93.45z"
      ></path>
      <path
        fill="currentColor"
        d="M66.75 17.886A133.5 133.5 0 004.549 98.948l38.685 10.365A93.45 93.45 0 0186.775 52.57L66.75 17.886z"
      ></path>
    </svg>
  );
};

export default LoaderIcon;
