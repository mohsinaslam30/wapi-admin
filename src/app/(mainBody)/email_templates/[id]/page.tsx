"use client";

import EmailTemplateEditContainer from "@/src/components/email_templates/edit/EmailTemplateEditContainer";
import { useParams } from "next/navigation";

const EmailTemplateEditPage = () => {
  const params = useParams();
  const id = params.id as string;

  return <EmailTemplateEditContainer id={id} />;
};

export default EmailTemplateEditPage;
