import { useSwitchToTenantMutation } from "@/src/redux/api/selfTenantApi";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const getFrontUrl = () => {
  const url = process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};
const FRONT_URL = getFrontUrl();

export const useSwitchToTenant = () => {
  const { t } = useTranslation();
  const [switchToTenant, { isLoading }] = useSwitchToTenantMutation();

  const handleSwitch = async () => {
    try {
      const result = await switchToTenant().unwrap();
      if (result.success && result.token) {
        toast.success(t("switching_to_tenant_mode", { defaultValue: "Switching to tenant mode..." }));
        window.location.href = `${FRONT_URL}/auth/impersonate?token=${result.token}&type=self-tenant`;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || t("failed_to_switch_to_tenant", { defaultValue: "Failed to switch to tenant mode" }));
    }
  };

  return { handleSwitch, isLoading };
};
