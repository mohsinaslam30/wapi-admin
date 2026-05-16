/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDeletePlanMutation, useGetAllPlansQuery, useSyncPlansMutation } from "@/src/redux/api/planApi";
import { useState } from "react";
import { toast } from "sonner";
import PlanList from "./PlanList";
import PlanHeader from "./PlanHeader";
import FreeTrialModal from "./FreeTrialModal";

const PlanContainer = () => {
  const { data, isLoading, refetch, isFetching } = useGetAllPlansQuery({
    limit: 100,
  });

  const [deletePlan, { isLoading: isDeleting }] = useDeletePlanMutation();
  const [syncPlans, { isLoading: isSyncing }] = useSyncPlansMutation();
  const [isFreeTrialModalOpen, setIsFreeTrialModalOpen] = useState(false);

  const handleDeletePlan = async (id: string) => {
    try {
      await deletePlan([id]).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete plan", error);
    }
  };

  const handleSyncPlans = async () => {
    try {
      const res = await syncPlans().unwrap();
      if (res.success) {
        toast.success(res.message || "Plans synchronized to gateways successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to sync plans to gateways");
    }
  };

  return (
    <div>
      <PlanHeader isLoading={isFetching} onFreeTrialClick={() => setIsFreeTrialModalOpen(true)} onSyncClick={handleSyncPlans} isSyncing={isSyncing} />

      <PlanList plans={data?.data.plans || []} onDelete={handleDeletePlan} isLoading={isLoading || isDeleting || isFetching} />

      <FreeTrialModal isOpen={isFreeTrialModalOpen} onClose={() => setIsFreeTrialModalOpen(false)} />
    </div>
  );
};

export default PlanContainer;
