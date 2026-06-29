
export interface Shortcode {
  type: string;
  text: string;
  action: string;
}

export interface EmailTemplate {
  _id: string;
  name: string;
  slug: string;
  description: string;
  subject: string;
  content: string;
  shortcodes: Shortcode[];
  is_system: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetEmailTemplatesResponse {
  success: boolean;
  data: EmailTemplate[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetEmailTemplateByIdResponse {
  success: boolean;
  data: EmailTemplate;
}

export interface UpdateEmailTemplateResponse {
  success: boolean;
  message: string;
  data: EmailTemplate;
}

export interface EmailPreviewProps {
  subject: string;
  content: string;
}

export interface EmailTemplateEditContainerProps {
  id: string;
}

export interface EmailTemplateFormProps {
  template: EmailTemplate;
  onSave: (data: { subject: string; content: string }) => void;
  isSaving: boolean;
  onDataChange: (data: { subject: string; content: string }) => void;
}

export interface EmailTemplateHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  isLoading: boolean;
}

export interface EmailTemplateListProps {
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