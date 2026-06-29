// User management types

import { User } from "./store";

// export interface AddUserPageProps {
//   onClose: () => void;
//   onSuccess?: () => void;
// }

export type UserFormState = {
  name: string;
  email: string;
  phone: string;
  password: string;
  country?: string;
  role?: string;
};

export interface UserListProps {
  onAddUser?: () => void;
}

export interface AddUserPageProps {
  id?: string;
}

export type FormState = {
  name: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  country_code: string;
  note: string;
  role_id: string;
  status: boolean;
}; 

export interface AssignPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export interface OverrideLimitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export interface UserListProps {
  users: User[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onSortChange?: (sortBy: string, sortOrder: "asc" | "desc") => void;
  columnVisibility: { id: string; isVisible: boolean }[];
  searchTerm?: string;
}