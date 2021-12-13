import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getYox } from "../helpers/yoxs";
import { getComentariosYox } from "../helpers/comentarios";
import Comentario from "../components/Comentario";

const YoxId = () => {
  const { id } = useParams();
  const [yoxId, setYoxId] = useState([]);
  const [categoriaYox, setCategoriaYox] = useState([]);
  const [userYox, setuserYox] = useState([]);
  const [comentarioId, setComentarioId] = useState([]);
  const [totalComent, setTotalComent] = useState("");

  useEffect(() => {
    getYox(id).then((res) => {
      setYoxId(res.yox);
      setuserYox(res.yox.usuario);
      setCategoriaYox(res.yox.categoria);
    });
  }, [id]);

  useEffect(() => {
    getComentariosYox(id).then((res) => {
      setComentarioId(res.comentario);
      setTotalComent(res.Total);
    });
  }, [id]);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Yox */}
          <div className="col-md-6 col-12 mb-5 ps-0 pe-0">
            <div className="container ps-0 pe-0">
              <div
                className="row me-3 pt-2 pb-2 text-white mb-2"
                style={{ backgroundColor: "black", borderRadius: "9px" }}
              >
                <span>YOXED/{categoriaYox.nombre}</span>
              </div>
              <div className="row">
                <div className="col-md-7 col-12 mb-2 ps-0 pe-0">
                  <img
                    src={yoxId.url}
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "6px",
                    }}
                    alt=""
                  />
                </div>
                <div className="col-md-5 col-12 pe-0">
                  <h3>{yoxId.titulo}</h3>
                  <p>{yoxId.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Yox */}
          {/* Comentarios */}
          <div className="col-md-6 col-12 ps-0 pe-0">
            <div className="container ps-0 pe-0">
              <div className="row">
                <Comentario
                  comentarioId={comentarioId}
                  totalComent={totalComent}
                  userYox={userYox}
                />
              </div>
            </div>
          </div>
          {/* Comentarios */}
        </div>
      </div>
    </>
  );
};

export default YoxId;
