import React from "react";
import Image from "next/image";
import LogoImage from "@/assets/FileMatrix.png";
import { LogoProps } from "@/utils/types";

const Logo: React.FC<LogoProps> = ({ className }) => (
  <div className={`flex items-center ${className}`}>
    <Image src={LogoImage} alt={"FileMatrix"} width={32} height={32} />
    <span className="ml-2 text-lg font-semibold">ileMatrix</span>
  </div>
);

export default Logo;
