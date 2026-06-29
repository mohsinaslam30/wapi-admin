/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateRoleMutation } from "@/src/redux/api/roleApi";
import RoleForm from "@/src/components/roles/components/RoleForm";
import { ROUTES } from "@/src/constants";

const AddRole = () => {
  const router = useRouter();
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const handleSubmit = async (values: any) => {
    try {
      const res = await createRole(values).unwrap();
      toast.success(res.message || "Role created successfully");
      router.push(ROUTES.Roles);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create role");
    }
  };

  return (
    <div>
      <RoleForm mode="create" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AddRole;
