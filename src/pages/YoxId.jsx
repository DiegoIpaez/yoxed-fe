import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getYox } from "../helpers/yoxs";

const YoxId = () => {
  const { id } = useParams();
  const [yoxId, setYoxId] = useState([]);

  useEffect(() => {
     getYox(id).then((res)=>{
         setYoxId(res.yox)
     })
  }, [id])

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          {/* Yox */}
          <div className="col-6">
            <div className="container">
                <div className="row">
                  <img src={yoxId.url} style={{ width: "450px" }} alt="" />
                  <h6>{yoxId.titulo}</h6>
                  <p>{yoxId.descripcion}</p>
                </div>
            </div>
          </div>
          {/* Yox */}
          {/* Comentarios */}
          <div className="col-6">
            <div className="container"></div>
          </div>
          {/* Comentarios */}
        </div>
      </div>
    </>
  );
};

export default YoxId;
