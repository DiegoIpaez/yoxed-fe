import React from "react";
import { Link } from "react-router-dom"

const YoxCard = ({ yox }) => {
  return (
    <>
      {yox.loading ? (
        <h1 className="text-center mt-5">Cargando...</h1>
      ) : (
        <>
          {yox.datos.map((yox) => (
            <div className="row" key={yox._id}>
                <Link to={`/yoxId/${yox._id}`}>
              <div className="col-xl-6 col-lg-4 col-md-3 col-6">
                <img
                  src={
                    yox.url
                      ? yox.url
                      : "https://pbs.twimg.com/profile_images/1310693973464416257/hsA1diiN_400x400.jpg"
                  }
                  alt={yox.titulo}
                />
                <h5>{yox.titulo}</h5>
              </div></Link>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default YoxCard;
