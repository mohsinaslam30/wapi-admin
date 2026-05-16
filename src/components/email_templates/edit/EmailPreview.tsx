"use client";

import { useAppSelector } from "@/src/redux/hooks";
import { useTranslation } from "react-i18next";

interface EmailPreviewProps {
  subject: string;
  content: string;
}

const EmailPreview = ({ subject, content }: EmailPreviewProps) => {
  const { t } = useTranslation();
  const { data } = useAppSelector((state) => state.settings);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-(--card-color) rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-sm overflow-hidden">
      <div className="bg-gray-50 dark:bg-(--dark-body) sm:px-6 px-4 py-4 border-b border-gray-100 dark:border-(--card-border-color)">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-wider">{t("email_template_preview_label")}</h3>
      </div>

      <div className="sm:p-6 p-4 flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-2xl mx-auto bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 dark:border-(--card-border-color) bg-gray-50/30 dark:bg-(--card-color)">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <span className="text-xs font-bold text-gray-400 w-16 italic">Subject:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{subject || "(No Subject)"}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-xs font-bold text-gray-400 w-16 italic">From:</span>
                <span className="text-sm text-gray-500 italic font-medium">{"<System Notification>"}</span>
              </div>
            </div>
          </div>

          <div className="sm:p-6 p-4 prose prose-slate dark:prose-invert max-w-none ck-content min-h-75" dangerouslySetInnerHTML={{ __html: content || `<p class="text-gray-300 italic">No content yet...</p>` }} />

          <div className="sm:p-6 p-4 border-t border-gray-50 dark:border-(--card-border-color) dark:bg-(--card-color) bg-gray-50/20 text-center">
            <p className="text-[12px] text-gray-400 font-semibold">
              © {new Date().getFullYear()} {data?.app_name || t("common_app_name")}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
