import PublicPage from "@/src/components/pages/components/PublicPage";
import { PageProps } from "@/src/types/pageManagement";

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <PublicPage slug={slug} />;
};

export default page;
 