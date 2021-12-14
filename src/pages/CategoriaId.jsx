import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getYoxCateg } from "../helpers/yoxs";
import YoxCard from "../components/YoxCard";

const CategoriaId = () => {
  const { id } = useParams();

  const [yoxCateg, setYoxCateg] = useState({
    datos: [],
    loading: true,
  });

  useEffect(() => {
    getYoxCateg(id).then((res) => {
      setYoxCateg({
        datos: res.yox,
        loading: false,
      });
    });
  }, [id]);

  return (
    <div className="container-fluid">
      <YoxCard yox={yoxCateg} />
    </div>
  );
};

export default CategoriaId;
