import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getYoxCateg } from "../helpers/yoxs";

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
      });
    });
  }, [id]);

  return (
    <div className="container">
      {yoxCateg.datos.map((yox) => (
        <div className="row" key={yox._id}>
          <div className="col">{yox.titulo}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoriaId;
