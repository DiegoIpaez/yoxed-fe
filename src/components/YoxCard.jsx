import React from "react";
import { Link } from "react-router-dom";

const YoxCard = ({ yox }) => {
  return (
    <>
      {yox.loading ? (
        <h1 className="text-center mt-5">Cargando...</h1>
      ) : (
        <div className="row">
          {yox.datos.map((yox) => (
            <div className="col-xl-2 col-lg-4 col-md-6 col-6 ps-0 pe-0" key={yox._id}>
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
      )}
    </>
  );
};

export default YoxCard;
