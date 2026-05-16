import { baseApi } from "./baseApi";

interface SwitchToTenantResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    isSelfTenant: boolean;
  };
}

const selfTenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    switchToTenant: builder.mutation<SwitchToTenantResponse, void>({
      query: () => ({
        url: "/self-tenant/switch-to-tenant",
        method: "POST",
      }),
    }),
  }),
});

export const { useSwitchToTenantMutation } = selfTenantApi;
