"use client";

import EditRole from "@/src/components/roles/EditRole";
import { useParams } from "next/navigation";

export default function EditRolePage() {
  const params = useParams();
  const id = params.id as string;

  return <EditRole id={id} />;
}
 