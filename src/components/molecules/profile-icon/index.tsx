import React from "react";
import Image from "next/image";
import ProfileImage from "@/assets/ProfileImage.jpg";
import { ProfilePictureProps } from "@/utils/types";

const ProfilePicture: React.FC<ProfilePictureProps> = ({ alt, className }) => (
  <div className={`rounded-full overflow-hidden ${className}`}>
    <Image src={ProfileImage} alt={alt} width={40} height={40} />
  </div>
);

export default ProfilePicture;
