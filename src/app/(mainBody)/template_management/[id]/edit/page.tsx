"use client";

import { AdminTemplateForm } from "@/src/components/templates/AdminTemplateForm";
import { EditTemplatePageProps } from "@/src/types/pages";
import { use } from "react";

const EditTemplatePage = ({ params }: EditTemplatePageProps) => {
  const { id } = use(params);
  return <AdminTemplateForm templateId={id} />;
};

export default EditTemplatePage;
