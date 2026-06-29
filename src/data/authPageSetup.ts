import { KeyRound, LogIn, MessageSquareText, ShieldAlert, UserPlus } from "lucide-react";

export const tabs = [
  {
    id: "login",
    label: "auth_page_setup_tabs_login",
    icon: LogIn,
    description: "auth_page_setup_tabs_login_desc",
  },
  {
    id: "register",
    label: "auth_page_setup_tabs_register",
    icon: UserPlus,
    description: "auth_page_setup_tabs_register_desc",
  },
  {
    id: "forgot_password",
    label: "auth_page_setup_tabs_forgot_password",
    icon: KeyRound,
    description: "auth_page_setup_tabs_forgot_password_desc",
  },
  {
    id: "otp",
    label: "auth_page_setup_tabs_otp",
    icon: MessageSquareText,
    description: "auth_page_setup_tabs_otp_desc",
  },
  {
    id: "reset_password",
    label: "auth_page_setup_tabs_reset_password",
    icon: ShieldAlert,
    description: "auth_page_setup_tabs_reset_password_desc",
  },
] as const;