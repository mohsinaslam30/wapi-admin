"use client";

import { useListEmailTemplatesQuery } from "@/src/redux/api/emailTemplateApi";
import useDebounce from "@/src/utils/hooks/useDebounce";
import { useState } from "react";
import EmailTemplateHeader from "./EmailTemplateHeader";
import EmailTemplateList from "./EmailTemplateList";

const EmailTemplateContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const searchTerm = useDebounce(inputValue, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isFetching } = useListEmailTemplatesQuery({
    search: searchTerm,
    page: page,
    limit: limit,
    sort_by: sortBy,
    sort_order: sortOrder.toUpperCase() as "ASC" | "DESC",
  });

  const handleSortChange = (key: string, order: "asc" | "desc") => {
    setSortBy(key);
    setSortOrder(order);
    setPage(1);
  };

  return (
    <div>
      <EmailTemplateHeader onSearch={setInputValue} searchTerm={inputValue} isLoading={isFetching} />
      <EmailTemplateList templates={data?.data || []} isLoading={isLoading || isFetching} total={data?.pagination.total || 0} page={page} totalPages={data?.pagination.totalPages || 1} onPageChange={setPage} limit={limit} onLimitChange={setLimit} onSortChange={handleSortChange} searchTerm={searchTerm} />
    </div>
  );
};

export default EmailTemplateContainer;
