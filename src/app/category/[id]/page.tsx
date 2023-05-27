"use client"
import React, { useEffect, useState } from "react";
import { getYoxCateg } from "../../../services/yoxs.service";
import YoxCard from "../../../components/YoxCard";

interface Params {
  params: {
    id: string;
  };
}

const initialValues = {
  data: [],
  loading: true,
};

const CategoriaId = ({ params }: Params) => {
  const { id } = params;
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
