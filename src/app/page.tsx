import { getYoxs } from "@/services";
import { YoxContainer } from "@/components/YoxCard";

const fetchData = async () => {
  try {
    const { yoxs } = await getYoxs();
    return yoxs;
  } catch (error) {
    return [];
  }
};

const Home = async () => {
  const yoxs = await fetchData();

  return <YoxContainer yoxs={yoxs} />;
};

export default Home;
