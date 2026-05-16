"use client";

import { ROUTES } from "@/src/constants";
import { Button } from "@/src/elements/ui/button";
import DataTable from "@/src/shared/DataTable";
import { EmailTemplate } from "@/src/types/emailTemplate";
import { ColumnDef } from "@/src/types/shared";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface EmailTemplateListProps {
  templates: EmailTemplate[];
  isLoading: boolean;
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  onSortChange: (key: string, order: "asc" | "desc") => void;
  searchTerm: string;
}

const EmailTemplateList = ({ templates, isLoading, total, page, onPageChange, limit, onLimitChange, onSortChange, searchTerm }: EmailTemplateListProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const columns: ColumnDef<EmailTemplate>[] = [
    { header: t("languages_name"), className: " [@media(max-width:1597px)]:min-w-[216px] ", accessorKey: "name", sortable: true },
    { header: "Slug", className: " [@media(max-width:1597px)]:min-w-[240px] ", accessorKey: "slug", sortable: true },
    { header: t("email_template_subject_label"), className: " [@media(max-width:1597px)]:min-w-[440px] ", accessorKey: "subject", sortable: true },
    {
      header: t("common_updated_at"),
      className: " [@media(max-width:1597px)]:min-w-[218px] ",
      accessor: (row: EmailTemplate) => new Date(row.updated_at).toLocaleDateString(),
      sortKey: "updated_at",
      sortable: true,
    },
  ];

  const renderActions = (template: EmailTemplate) => (
    <Button variant="ghost" size="sm" onClick={() => router.push(`${ROUTES.EmailTemplates}/${template._id}`)} className="h-10 w-10 p-0 text-primary hover:text-primary hover:bg-primary/10 border-none shadow-none dark:bg-page-body rounded-lg" title={t("common_edit") || "Edit"}>
      <Edit2 size={16} />
    </Button>
  );

  return (
    <div className="mt-4">
      <DataTable columns={columns} data={templates} isLoading={isLoading} total={total} page={page} onPageChange={onPageChange} limit={limit} onLimitChange={onLimitChange} onSortChange={onSortChange} searchTerm={searchTerm} renderActions={renderActions} itemLabel="templates" itemLabelSingular="Template" />
    </div>
  );
};

export default EmailTemplateList;
