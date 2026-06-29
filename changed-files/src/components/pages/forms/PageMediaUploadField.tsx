/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import { useUploadPageMediaMutation } from "@/src/redux/api/pageApi";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/src/elements/ui/button";
import { Label } from "@/src/elements/ui/label";
import { Input } from "@/src/elements/ui/input";
import { PageMediaUploadFieldProps } from "@/src/types/landingPage";



export function PageMediaUploadField({ label, value, onChange }: PageMediaUploadFieldProps) {
  const [uploadMedia, { isLoading }] = useUploadPageMediaMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadMedia(formData).unwrap();
      if (res.success && res.fileUrl) {
        onChange(res.fileUrl);
        toast.success("File uploaded successfully");
      } else {
        toast.error("Failed to upload file");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err?.data?.message || "Error uploading file");
    }
  };

  const getFullImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "http://localhost:5000";
    return `${storageUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const fileInputId = React.useId();

  return (
    <div className="w-full">
      {label && (
        <Label className="block text-sm font-bold capitalize text-slate-650 dark:text-gray-300 mb-1.5">
          {label}
        </Label>
      )}

      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-(--card-border-color) bg-slate-50 dark:bg-page-body p-2 flex items-center justify-between group max-w-md">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded border border-gray-150 dark:border-(--card-border-color) overflow-hidden bg-white dark:bg-(--page-body-bg) flex items-center justify-center">
              <Image
                src={getFullImageUrl(value)}
                alt={label || "Uploaded Asset"}
                className="w-full h-full object-contain"
                width={100}
                height={100}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-300 break-all whitespace-normal line-clamp-1" title={value}>
                {value.split('/').pop()}
              </p>
              <Button
                type="button"
                onClick={() => {
                  const el = document.getElementById(fileInputId);
                  if (el) el.click();
                }}
                disabled={isLoading}
                className="text-xs bg-[unset]! h-[unset]! shadow-none p-0 hover:bg-[unset] break-all whitespace-normal line-clamp-1  font-semibold text-(--text-green-primary) hover:underline mt-1 block"
              >
                Change File
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1.5 bg-red-500 hover:bg-red-650 text-white rounded-full transition-all"
            title="Remove file"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => {
            if (!isLoading) {
              const el = document.getElementById(fileInputId);
              if (el) el.click();
            }
          }}
          className="border-2 border-dashed border-gray-200 dark:border-(--card-border-color) rounded-lg p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-(--dark-sidebar) transition-all max-w-md group"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 text-(--text-green-primary) animate-spin" />
          ) : (
            <UploadCloud className="w-6 h-6 text-gray-450 group-hover:scale-110 transition-transform" />
          )}
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {isLoading ? "Uploading file..." : "Click to upload image or GIF"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, GIF, WebP up to 5MB</p>
          </div>
        </div>
      )}

      <Input
        id={fileInputId}
        type="file"
        accept="image/*,image/gif"
        className="hidden"
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </div>
  );
}
