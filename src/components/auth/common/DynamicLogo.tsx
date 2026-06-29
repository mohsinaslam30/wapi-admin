"use client";

import { Skeleton } from "@/src/elements/ui/skeleton";
import { useGetIsDemoModeQuery } from "@/src/redux/api/authApi";
import Image from "next/image";



const API_URL = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getUrlWithBasePath } from "@/src/utils";
import { DynamicLogoProps } from "@/src/types/auth";

const resolveUrl = (url?: string, isDark?: boolean): string => {
  if (!url || url.length <= 0) return getUrlWithBasePath(isDark ? "/assets/logos/logo3.png" : "/assets/logos/logo1.png");
  if (url.startsWith("http") || url.startsWith("https") || url.startsWith("data:")) return url;
  
  const baseUrl = (API_URL || "").endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  
  if (url.startsWith("/uploads/")) {
    return `${baseUrl}${url}`;
  }
  if (url.startsWith("uploads/")) {
    return `${baseUrl}/${url}`;
  }
  if (url.startsWith("/")) {
    return getUrlWithBasePath(url);
  }
  return getUrlWithBasePath(`/${url}`);
};

export const DynamicLogo = ({
  width = 160,
  height = 48,
  className = "h-12 w-auto object-contain",
  skeletonClassName = "h-12 w-40"
}: DynamicLogoProps) => {
  const { data: demoModeRes, isLoading } = useGetIsDemoModeQuery();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return <Skeleton className={skeletonClassName} />;
  }

  const isDark = mounted && resolvedTheme === "dark";
  const rawLogo = isDark 
    ? (demoModeRes?.logo_dark_url || demoModeRes?.logo_light_url) 
    : (demoModeRes?.logo_light_url || demoModeRes?.logo_dark_url);

  const logoUrl = resolveUrl(rawLogo, isDark);

  return (
    <Image
      src={logoUrl}
      alt="App Logo"
      width={width}
      height={height}
      className={className}
      unoptimized
      priority
    />
  );
};
