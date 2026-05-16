export interface BulletItem {
  title: string;
  points: string[];
}

export interface SidePanelData {
  badge?: string;
  title: string;
  description: string;
  bullets: BulletItem[];
  footer?: BulletItem[];
}

export interface LoginPageData {
  title: string;
  subtitle: string;
  button_text: string;
  forgot_password_text: string;
  signup_text: string;
  signup_link_text: string;
  side_panel: SidePanelData;
}

export interface RegisterPageData {
  title: string;
  subtitle: string;
  button_text: string;
  login_text: string;
  login_link_text: string;
  side_panel: SidePanelData;
}

export interface ForgotPasswordPageData {
  title: string;
  subtitle: string;
  button_text: string;
  back_to_login_text: string;
  login_link_text: string;
  side_panel: SidePanelData;
}

export interface OtpPageData {
  title: string;
  subtitle: string;
  button_text: string;
  resend_text: string;
  footer_text: string;
  side_panel: SidePanelData;
}

export interface ResetPasswordPageData {
  title: string;
  subtitle: string;
  button_text: string;
  back_to_login_text: string;
  login_link_text: string;
  side_panel: SidePanelData;
}

export interface AuthPageSetupData {
  _id?: string;
  login_page: LoginPageData;
  register_page: RegisterPageData;
  forgot_password_page: ForgotPasswordPageData;
  otp_page: OtpPageData;
  reset_password_page: ResetPasswordPageData;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetAuthPageSetupResponse {
  success: boolean;
  data: AuthPageSetupData;
}

export interface UpdateAuthPageSetupResponse {
  success: boolean;
  message: string;
  data: AuthPageSetupData;
}
