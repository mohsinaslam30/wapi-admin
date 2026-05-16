"use client";

import { useGetPageByIdQuery } from "@/src/redux/api/pageApi";
import { DynamicLogo } from "../auth/common/DynamicLogo";
import { Skeleton } from "@/src/elements/ui/skeleton";
import { Button } from "@/src/elements/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/src/constants";
import { useAppSelector } from "@/src/redux/hooks";
import { t } from "i18next";

interface PublicPageProps {
  slug: string;
}

const PublicPage = ({ slug }: PublicPageProps) => {
  const { data, isLoading, error } = useGetPageByIdQuery(slug);
  const settings = useAppSelector((state) => state.settings.data);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col">
        <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 p-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <DynamicLogo />
            <Skeleton className="h-10 w-32" />
          </div>
        </header>
        <main className="flex-1 max-w-4xl mx-auto w-full p-6 sm:p-12">
          <Skeleton className="h-12 w-3/4 mb-8" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-5/6 mb-4" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-4/5 mb-4" />
        </main>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <DynamicLogo className="h-16 w-auto mx-auto mb-8" />
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <Button asChild>
            <Link href={ROUTES.Login}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const page = data.data;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-50 p-4">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <Link href={ROUTES.Login} className="hover:opacity-80 transition-opacity">
            <DynamicLogo />
          </Link>
          <Button variant="ghost" asChild className="text-slate-600 dark:text-slate-400 bg-transparent!">
            <Link href={ROUTES.Login}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full py-12 px-6 sm:px-12">
        <div className="bg-white dark:bg-zinc-900 shadow border border-slate-100 dark:border-zinc-800 rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-zinc-800 pb-6">
              {page.title}
            </h1>
            
            <div 
              className="public-content text-slate-600 dark:text-slate-400 
                [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-slate-900 [&_h1]:dark:text-white
                [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-slate-900 [&_h2]:dark:text-white
                [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-slate-900 [&_h3]:dark:text-white
                [&_p]:mb-5 [&_p]:leading-relaxed
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5
                [&_li]:mb-2
                [&_strong]:font-bold [&_strong]:text-slate-900 [&_strong]:dark:text-white
                [&_a]:text-emerald-600 [&_a]:dark:text-emerald-500 [&_a]:underline hover:[&_a]:text-emerald-700"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
          
          <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 sm:px-8 border-t border-slate-100 dark:border-zinc-800 flex justify-between items-center flex-wrap gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: {page.updated_at ?new Date(page.updated_at).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }): new Date().toLocaleDateString()}
            </p>
            <div className="flex gap-4">
               {/* Could add share buttons here if needed */}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} {settings?.app_name || t('common_app_name')} CRM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicPage;
