import TaxForm from "@/src/components/tax/TaxForm";
import { EditTaxPageProps } from "@/src/types/taxConfiguration";

const EditTaxPage = async ({ params }: EditTaxPageProps) => {
  const { id } = await params;
  return <TaxForm id={id} />;
};

export default EditTaxPage;
