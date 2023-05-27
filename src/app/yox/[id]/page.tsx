"use client";
import React, { useEffect, useState } from "react";
import { getYox } from "../../../services/yoxs.service";
import { getComentariosYox } from "../../../services/commentary.service";
import Comments from "../../../components/Comments";
import { Yox, Category, User } from "../../../models";

interface Params {
  params: {
    id: string;
  };
}

const YoxId = ({ params }: Params) => {
  const { id } = params;
  const [yox, setYox] = useState<Yox>({});
  const [yoxCategory, setYoxCategory] = useState<Category>({});
  const [userYox, setUserYox] = useState<User>({});
  const [comments, setComments] = useState([]);
  const [totalComents, setTotalComents] = useState(0);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await getYox(id);
        setYox(res.yox);
        setUserYox(res.yox.usuario);
        setYoxCategory(res.yox.categoria);
      };
      fetchData();
    } catch (error) {
      setYox({});
      setUserYox({});
      setYoxCategory({});
    }
  }, [id]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await getComentariosYox(id);
        setComments(res.comentario);
        setTotalComents(res.Total);
      };
      fetchData();
    } catch (error) {
      setComments([]);
      setTotalComents(0);
    }
  }, [id]);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Yox */}
          <div className="col-md-6 col-12 mb-5 ">
            <div className="container ">
              <div
                className="row bg-dark pt-2 pb-2 text-white mb-3"
                style={{ borderRadius: "9px" }}
              >
                <span>YOXED/{yoxCategory.nombre}</span>
              </div>
              <div className="row text-white">
                <div className="col-md-7 col-12 mb-2 ps-0 pe-0">
                  {/*eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                    src={yox.url}
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "6px",
                    }}
                    alt=""
                  />
                </div>
                <div className="col-md-5 col-12">
                  <h3>{yox.titulo}</h3>
                  <p>{yox.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Yox */}
          {/* Comentarios */}
          <div className="col-md-6 col-12">
            <div className="container  ps-0 pe-0">
              <Comments
                comments={comments}
                totalComents={totalComents}
                userYox={userYox}
                id={id}
              />
            </div>
          </div>
          {/* Comentarios */}
        </div>
      </div>
    </>
  );
};

export default YoxId;
