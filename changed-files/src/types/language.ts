import { PaginationInfo } from "./store";

export interface Language {
  _id: string;
  name: string;
  locale: string;
  is_rtl: boolean;
  is_active: boolean;
  translation_json: any;
  flag: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GetLanguagesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: boolean;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

export interface GetLanguagesResponse {
  success: boolean;
  data: {
    languages: Language[];
    pagination: PaginationInfo;
  };
}

export interface GetLanguageByIdResponse {
  success: boolean;
  data: Language;
}

export interface CreateLanguageRequest {  // unused
  name: string;
  locale: string;
  is_rtl?: boolean;
  is_active?: boolean;
  translation_json?: File;
  flag?: File;
}

export type UpdateLanguageRequest = Partial<CreateLanguageRequest>;  // unused

export interface DeleteLanguageResponse {
  success: boolean;
  message: string;
  data: {
    deletedCount: number;
    deletedIds: string[];
  };
}

export interface AddLanguagePageProps {
  id?: string;
} 

export interface LanguageListProps {
  languages: Language[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onToggleStatus: (id: string) => void;
  isLoading: boolean;
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  onSelectionChange: (ids: string[]) => void;
  selectedIds: string[];
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  searchTerm?: string;
}

export interface TranslationManagementProps {
  id: string;
}