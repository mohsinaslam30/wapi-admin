export interface AddFaqPageProps {
  id?: string;
}

export type FaqFormState = {
  title: string;
  description: string;
  status: boolean;
}; 

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { status?: string }) => void;
  currentFilters?: { status?: string };
}

