import { getYoxCateg } from "@/services";
import { YoxContainer } from "@/components/YoxCard";

interface Params {
  params: {
    id: string;
  };
}
const fetchData = async (id: string) => {
  try {
    const { yox } = await getYoxCateg(id);
    return yox;
  } catch (error) {
    return [];
  }
};

const CategoriaId = async ({ params }: Params) => {
  const { id } = params;
  const yoxs = await fetchData(id);

  return <YoxContainer yoxs={yoxs} />;
};

export default CategoriaId;
