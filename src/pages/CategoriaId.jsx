import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getYoxCateg } from "../services/yoxs.service";
import YoxCard from "../components/YoxCard";

const initialValues = {
  data: [],
  loading: true,
};

const CategoriaId = () => {
  const { id } = useParams();
  const [yoxCateg, setYoxCateg] = useState(initialValues);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getYoxCateg(id);
        setYoxCateg({
          data: category.yox,
          loading: false,
        });
      } catch (error) {
        setYoxCateg(initialValues);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container-fluid">
      <YoxCard yox={yoxCateg} />
    </div>
  );
};

export default CategoriaId;
