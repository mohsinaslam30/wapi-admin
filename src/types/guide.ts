export interface GuideSectionImage {
  url: string;
  caption?: string;
}

export interface GuideSection {
  _id?: string;
  title: string;
  content: string;
  images: GuideSectionImage[];
}

export interface Guide {
  _id: string;
  title: string;
  category: string;
  sub_title: string;
  slug: string;
  description: string;
  order: number;
  position: number;
  sections: GuideSection[];
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface GuideCategory {
  name: string;
  slug: string;
  position: number;
}

export interface CreateGuideRequest {
  title: string;
  category: string;
  sub_title?: string;
  slug?: string;
  description?: string;
  sections?: GuideSection[];
  status?: boolean;
  isNewCategory?: boolean;
}

export interface UpdateGuideRequest extends Partial<CreateGuideRequest> {
  id: string;
}

export interface ReorderRequest {
  guides?: { id: string; order: number }[];
  categories?: { slug: string; position: number }[];
}

export interface DeleteGuideRequest {
  id?: string;
  slug?: string;
}

export interface GuideApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

export interface AllGuidesData {
  guides: Guide[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
