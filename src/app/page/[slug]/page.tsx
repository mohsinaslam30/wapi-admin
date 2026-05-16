import PublicPage from "@/src/components/pages/PublicPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <PublicPage slug={slug} />;
};

export default page;
