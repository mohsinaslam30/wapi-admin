import { PaginationInfo } from "./store";

export interface ButtonData {
  text: string;
  link: string;
  _id?: string;
}

export interface FloatingImage {
  url: string;
  position:
    | "left"
    | "right"
    | "left-top"
    | "right-top"
    | "left-bottom"
    | "right-bottom";
  _id?: string;
}

export interface HeroSection {
  badge: string;
  title: string;
  description: string;
  primary_button: ButtonData;
  hero_image: string;
  floating_images: FloatingImage[];
  brand_logos?: string[];
  trusted_label?: string;
  _id?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  image: string;
  _id?: string;
}

export interface FeaturesSection {
  badge: string;
  title: string;
  description: string;
  cta_button: ButtonData;
  features: FeatureItem[];
  _id?: string;
}

export interface PlatformItem {
  step: number;
  tagline: string;
  title: string;
  description: string;
  bullets: string[];
  image: string;
  _id?: string;
}

export interface PlatformSection {
  badge: string;
  title: string;
  items: PlatformItem[];
  _id?: string;
}

export interface PricingSection {
  title: string;
  badge: string;
  description: string;
  subscribed_count: string;
  subscribed_user?: string;
  plans: string[] | any[]; // string[] for IDs while updating, any[] for populated objects
  _id?: string;
}

export interface TestimonialsSection {
  title: string;
  badge: string;
  testimonials: string[] | any[];
  _id?: string;
}

export interface FaqSection {
  title: string;
  description?: string;
  badge: string;
  faqs: string[] | any[];
  _id?: string;
}

export interface ContactSection {
  title: string;
  subtitle: string;
  description?: string;
  form_enabled: boolean;
  phone_no: string;
  email: string;
  _id?: string;
}

export interface FooterSection {
  cta_title: string;
  cta_description: string;
  cta_buttons: ButtonData[];
  social_links: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    _id?: string;
  }[];
  copy_rights_text: string;
  _id?: string;
}

export interface MenuItem {
  title: string;
  link_type: "Sub" | "Link";
  mega_menu?: boolean;
  mega_menu_type?:
    | "Simple"
    | "Link With Image"
    | "Side Banner"
    | "Bottom Banner"
    | "Product Box"
    | "Blog Box";
  target_blank?: boolean;
  page_link?: string;
  path?: string;
  link_image?: string;
  badge_text?: string;
  badge_color?: string;
  status: boolean;
  children?: MenuItem[];
  description?: string;
  icon?: string;
  _id?: string;
}

export interface HeaderSection {
  logo_url?: string;
  menu_items: MenuItem[];
  _id?: string;
}

export interface LandingPageData {
  _id?: string;
  hero_section: HeroSection;
  features_section: FeaturesSection;
  platform_section?: PlatformSection;
  pricing_section: PricingSection;
  testimonials_section: TestimonialsSection;
  faq_section: FaqSection;
  contact_section: ContactSection;
  footer_section: FooterSection;
  header_section?: HeaderSection;
  landing_page_enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetLandingPageResponse {
  success: boolean;
  data: LandingPageData;
}

export interface UpdateLandingPageResponse {
  success: boolean;
  message: string;
  data: LandingPageData;
}

export interface UploadLandingImageResponse {
  success: boolean;
  message: string;
  imageUrl: string;
}

export interface BrandingFormProps {
  data: HeroSection;
  onChange: (data: HeroSection) => void;
}
export interface PageColorConfig {
  primary_color?: string;
  gradient?: string;
}
export interface Page {
  _id: string;
  title: string;
  slug: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  meta_image?: string;
  status: boolean;
  sort_order?: number;
  color_config?: PageColorConfig;
  system_reserved?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface GetPagesResponse {
  success: boolean;
  data: {
    pages: Page[];
    pagination: PaginationInfo;
  };
}
export interface ColorConfigFormProps {
  data?: PageColorConfig;
  onChange: (data: PageColorConfig) => void;
}

export interface ContactFormProps {
  data: ContactSection;
  onChange: (data: ContactSection) => void;
}

export interface FaqFormProps {
  data: any;
  onChange: (data: any) => void;
}

export interface FeaturesFormProps {
  data: FeaturesSection;
  onChange: (data: FeaturesSection) => void;
}

export interface FooterFormProps {
  data: FooterSection;
  onChange: (data: FooterSection) => void;
}

export interface HeaderFormProps {
  data: HeaderSection;
  onChange: (data: HeaderSection) => void;
}

export interface FlatMenuItem {
  id: string;
  title: string;
  link_type: "Sub" | "Link";
  parent_id: string;
  mega_menu: boolean;
  mega_menu_type:
    | "Simple"
    | "Link With Image"
    | "Side Banner"
    | "Bottom Banner"
    | "Product Box"
    | "Blog Box";
  target_blank: boolean;
  page_link: string;
  path: string;
  link_image: string;
  badge_text: string;
  badge_color: string;
  status: boolean;
  sort_order: number;
  description?: string;
  icon?: string;
}

export interface HeroFormProps {
  data: HeroSection;
  onChange: (data: HeroSection) => void;
}

export interface MenuEditSettingsProps {
  selectedItem: FlatMenuItem;
  pages: Page[];
  getParentOptions: () => FlatMenuItem[];
  handleUpdateItem: (
    fieldOrUpdates: keyof FlatMenuItem | Partial<FlatMenuItem>,
    value?: string | boolean | number,
  ) => void;
}

export interface PlatformFormProps {
  data: PlatformSection;
  onChange: (data: PlatformSection) => void;
}

export interface PricingFormProps {
  data: any;
  onChange: (data: any) => void;
}

export interface TestimonialsFormProps {
  data: any;
  onChange: (data: any) => void;
}

export interface ImageSelectorProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
}

export interface MediaUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { status?: string }) => void;
  currentFilters?: { status?: string };
}

export interface PageFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
  isEdit?: boolean;
}

export interface PageListProps {
  pages: Page[];
  isLoading: boolean;
  onDelete: (page: Page) => void;
  onBulkDelete: (ids: string[]) => void;
  onToggleStatus: (id: string) => void;
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  onSelectionChange: (ids: string[]) => void;
  selectedIds: string[];
  onSortChange: (key: string, order: "asc" | "desc") => void;
  visibleColumns: Record<string, boolean>;
  searchTerm?: string;
  isFilterActive?: boolean;
}

export interface PublicPageProps {
  slug: string;
}

export interface SharedFormProps {
  data: any;
  updateField: (path: string[], value: any) => void;
  renderHeader: (id: string, label: string) => React.ReactNode;
  renderTextInput: (
    path: string[],
    label: string,
    placeholder?: string,
  ) => React.ReactNode;
  renderMediaUploadInput: (path: string[], label: string) => React.ReactNode;
  renderStringArrayInput: (path: string[], label: string) => React.ReactNode;
  activeSection: string | null;
  toggleSection: (section: string) => void;
  labelClass: string;
  inputClass: string;
}

export interface ChannelPageDynamicFormProps {
  slug: string;
  dynamicContent: any;
  onChange: (value: any) => void;
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MetaImageFormProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export interface PageContentFormProps {
  title: string;
  slug: string;
  content: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (value: string) => void;
}

export interface PageMediaUploadFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
}

export interface SEOSettingsFormProps {
  metaTitle: string;
  metaDescription: string;
  onMetaTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMetaDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface VisibilitySettingsFormProps {
  status: boolean;
  onStatusChange: (val: boolean) => void;
}