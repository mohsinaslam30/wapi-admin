
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
