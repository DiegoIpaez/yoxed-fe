import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        loading: false,
      });
    });
  }, [id]);

  return (
    <>
      {yoxCateg.loading ? (
        <div className="container">
          <div className="row text-center mt-5"><h1>Cargando...</h1></div>
          
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            {yoxCateg.datos.map((yox) => (
              <div
                className="col-xl-2 col-lg-4 col-md-6 col-6 ps-0 pe-0"
                key={yox._id}
              >
                <Link to={`/yoxId/${yox._id}`}>
                  <img
                    src={
                      yox.url
                        ? yox.url
                        : "https://pbs.twimg.com/profile_images/1310693973464416257/hsA1diiN_400x400.jpg"
                    }
                    alt={yox.titulo}
                    style={{ width: "100%", height: "300px" }}
                  />
                  <h5>{yox.titulo}</h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriaId;
