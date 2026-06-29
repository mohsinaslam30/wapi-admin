/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { CKEditorComponentProps } from "@/src/types/shared";

// Load CkEditorInner dynamically with ssr: false so that the ckeditor
// module is evaluated only on the client side.
const CKEditorComponent = dynamic(() => import("./CkEditorInner"), {
  ssr: false,
  loading: ({ style }: any) => (
    <div className="min-h-40 dark:bg-(--card-color) flex items-center justify-center border border-gray-100 rounded-lg bg-gray-50/50" style={style}>
      <span className="text-gray-400 text-xs font-medium animate-pulse">Loading editor...</span>
    </div>
  ),
});

const CkEditorWrapper = (props: CKEditorComponentProps) => {
  return <CKEditorComponent {...props} />;
};

export default CkEditorWrapper;
