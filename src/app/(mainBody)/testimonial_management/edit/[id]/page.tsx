import AddTestimonialPage from "@/src/components/testimonial/AddTestimonialPage";

const EditTestimonial = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <AddTestimonialPage id={id} />;
};

export default EditTestimonial;
