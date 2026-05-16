/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/src/elements/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/elements/ui/dropdown-menu";
import { Input } from "@/src/elements/ui/input";
import { Label } from "@/src/elements/ui/label";
import { EmailTemplate } from "@/src/types/emailTemplate";
import { ChevronDown, Save, Wand2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const CkEditor = dynamic(() => import("@/src/shared/CkEditor"), { ssr: false });

interface EmailTemplateFormProps {
  template: EmailTemplate;
  onSave: (data: { subject: string; content: string }) => void;
  isSaving: boolean;
  onDataChange: (data: { subject: string; content: string }) => void;
}

const EmailTemplateForm = ({ template, onSave, isSaving, onDataChange }: EmailTemplateFormProps) => {
  const { t } = useTranslation();
  const [subject, setSubject] = useState(template.subject);
  const [content, setContent] = useState(template.content);
  const editorRef = useRef<any>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const [lastFocused, setLastFocused] = useState<"subject" | "content" | null>("content");

  useEffect(() => {
    onDataChange({ subject, content });
  }, [subject, content, onDataChange]);

  const handleInsertShortcode = (shortcode: string) => {
    if (lastFocused === "subject" && subjectRef.current) {
      const start = subjectRef.current.selectionStart || 0;
      const end = subjectRef.current.selectionEnd || 0;
      const newValue = subject.substring(0, start) + shortcode + subject.substring(end);
      setSubject(newValue);
      // Give focus back
      setTimeout(() => {
        if (subjectRef.current) {
          subjectRef.current.focus();
          const newPos = start + shortcode.length;
          subjectRef.current.setSelectionRange(newPos, newPos);
        }
      }, 0);
    } else if (lastFocused === "content" && editorRef.current) {
      const editor = editorRef.current;
      editor.model.change((writer: any) => {
        const insertPosition = editor.model.document.selection.getFirstPosition();
        writer.insertText(shortcode, insertPosition);
      });
      editor.editing.view.focus();
    }
  };

  return (
    <div className="bg-white dark:bg-(--card-color) sm:p-6 p-4 rounded-lg border border-gray-100 dark:border-(--card-border-color) shadow-sm space-y-8">
      <div className="flex flex-wrap gap-4 justify-between items-center bg-primary/5 p-4 rounded-lg border border-primary/10">
        <div>
          <h4 className="text-base font-bold text-primary flex items-center gap-2">
            <Wand2 size={16} />
            {t("email_template_shortcodes_label")}
          </h4>
          <p className="text-sm text-gray-400 font-medium mt-0.5">Click to insert at cursor position</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white dark:bg-(--dark-body) border-primary/20 text-primary hover:bg-primary hover:text-white transition-all gap-2 h-10 px-4 rounded-md font-bold shadow">
              <span>Select Shortcode</span>
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-(--card-color) border-gray-100 dark:border-(--card-border-color) p-1 rounded-md shadow">
            {template.shortcodes?.map((sc, idx) => (
              <DropdownMenuItem key={idx} onClick={() => handleInsertShortcode(sc.action)} className="cursor-pointer hover:bg-primary/5 focus:bg-primary/5 rounded-md py-2.5 px-3 transition-colors group">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">{sc.text}</span>
                  <span className="text-[10px] text-gray-400 font-mono tracking-tight">{sc.action}</span>
                </div>
              </DropdownMenuItem>
            ))}
            {(!template.shortcodes || template.shortcodes.length === 0) && <div className="p-3 text-center text-xs text-gray-400 italic font-medium">No shortcodes available</div>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-6">
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="subject" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {t("email_template_subject_label")}
          </Label>
          <Input id="subject" ref={subjectRef} value={subject} onChange={(e) => setSubject(e.target.value)} onFocus={() => setLastFocused("subject")} placeholder="Enter email subject..." className="h-12 bg-gray-50/50 dark:bg-(--dark-body) border-gray-100 dark:border-white/10 focus:ring-primary/20 focus:border-primary transition-all rounded-lg font-medium" />
        </div>

        <div className="space-y-2 flex flex-col">
          <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t("email_template_content_label")}</Label>
          <div className="overflow-hidden border border-gray-100 dark:border-white/10 rounded-lg bg-white dark:bg-(--dark-body) shadow-inner" onFocusCapture={() => setLastFocused("content")}>
            <CkEditor
              value={content}
              onChange={setContent}
              onReady={(editor) => {
                editorRef.current = editor;
              }}
              minHeight="400px"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 dark:border-white/5 flex justify-end">
        <Button onClick={() => onSave({ subject, content })} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-white gap-2 h-12 px-8 rounded-lg font-black text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all">
          {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
          {t("common_save_changes")}
        </Button>
      </div>
    </div>
  );
};

export default EmailTemplateForm;
