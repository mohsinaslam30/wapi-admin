"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface FlagProps {
  countryCode: string;
  className?: string;
  size?: number;
}

export const Flag: React.FC<FlagProps> = ({ countryCode, className, size = 20 }) => {
  if (!countryCode) return null;

  const code = countryCode.toLowerCase();

  return (
     
    <Image
      src={`https://flagcdn.com/w80/${code}.png`}
      // srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      width={size}
      height={25}
      unoptimized
      alt={`${countryCode} flag`}
      className={cn("inline-block align-middle rounded-xs object-cover overflow-hidden", className)}
      style={{
        aspectRatio: "4/3",
        minWidth: size,
        minHeight: Math.round(size * 0.75),
      }}
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://flagcdn.com/w80/un.png`; // Fallback to UN flag if not found
      }}
    />
  );
};
