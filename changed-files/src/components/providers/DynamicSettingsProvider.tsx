/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, ReactNode } from "react";
import { useGetSettingsQuery } from "@/src/redux/api/settingApi";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setSettings } from "@/src/redux/reducers/settingsSlice";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL ?? "";

import { getUrlWithBasePath } from "@/src/utils";

const resolveUrl = (url?: string): string => {
  if (!url) return "";
  
  // Replace backslashes with forward slashes for cross-platform compatibility
  const normalizedUrl = url.replace(/\\/g, "/");

  if (normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://") || normalizedUrl.startsWith("data:")) {
    return normalizedUrl;
  }

  const baseUrl = (STORAGE_URL || "").endsWith("/") ? STORAGE_URL.slice(0, -1) : STORAGE_URL;

  if (normalizedUrl.startsWith("/uploads/")) {
    return `${baseUrl}${normalizedUrl}`;
  }
  if (normalizedUrl.startsWith("uploads/")) {
    return `${baseUrl}/${normalizedUrl}`;
  }
  if (normalizedUrl.startsWith("/")) {
    return getUrlWithBasePath(normalizedUrl);
  }
  return getUrlWithBasePath(`/${normalizedUrl}`);
};

const DEFAULT_FAVICON = getUrlWithBasePath("/assets/logos/sidebarLogo.png");

function applyFavicon(href: string) {
  if (typeof window === "undefined" || !href) return;
  const links = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']");
  if (links.length > 0) {
    links.forEach((link: any) => {
      if (link.href !== href) link.href = href;
    });
  } else {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = href;
    document.head.appendChild(link);
  }
}

interface DynamicSettingsProviderProps {
  children: ReactNode;
}

const DynamicSettingsProvider = ({ children }: DynamicSettingsProviderProps) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { data: settingsData, isLoading, isError } = useGetSettingsQuery();
  const { data: settings, pageTitle, isSettingsLoaded } = useAppSelector((state) => state.settings);
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (settingsData) {
      dispatch(setSettings(settingsData));
    }
  }, [settingsData, dispatch]);

  useEffect(() => {
    if (mounted && settingsData?.default_theme_mode) {
      const saved = localStorage.getItem("theme");
      if (!saved || saved === "system") {
        setTheme(settingsData.default_theme_mode);
      }
    }
  }, [mounted, settingsData, setTheme]);

  useEffect(() => {
    if (!mounted) return;

    let faviconHref = "";
    if (isSettingsLoaded) {
      const { favicon_url } = settings || {};
      faviconHref = resolveUrl(favicon_url) || DEFAULT_FAVICON;
    } else if (isLoading) {
      faviconHref = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    } else if (isError) {
      faviconHref = DEFAULT_FAVICON;
    } else {
      faviconHref = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }

    const applyAll = () => {
      if (isSettingsLoaded && settings) {
        const { app_name, app_description } = settings;
        const fullTitle = `${pageTitle ? `${pageTitle} | ` : ""}${app_name || "WhatsApp CRM"} | All-in-One WhatsApp Marketing & Automation Platform with CRM, Campaigns, Live Chat, Lead Generation, Business API SaaS Platform`;
        if (document.title !== fullTitle) document.title = fullTitle;
        if (app_description) {
          let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
          if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "description");
            document.head.appendChild(meta);
          }
          if (meta.getAttribute("content") !== app_description) {
            meta.setAttribute("content", app_description);
          }
        }
      }
      if (faviconHref) {
        applyFavicon(faviconHref);
      }
    };

    applyAll();
    const observer = new MutationObserver(applyAll);
    observer.observe(document.head, { childList: true, subtree: false });
    const interval = setInterval(applyAll, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [settings, isSettingsLoaded, isLoading, isError, pathname, mounted, pageTitle]);

  return <>{children}</>;
};

export default DynamicSettingsProvider;
