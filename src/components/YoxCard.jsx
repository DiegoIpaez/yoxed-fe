import React from "react";
import { Link } from "react-router-dom";

const YoxCard = ({ yox }) => {
  return (
    <div className="row">
      {yox.loading ? (
        <h1 className="text-center mt-5">Cargando...</h1>
      ) : (
        <div className="row">
          {yox.datos.map((yox) => (
            <div className="col-xl-2 col-lg-4 col-md-6 col-12" key={yox._id}>
              <Link to={`/yoxId/${yox._id}`}>
                <img
                  src={
                    yox.url
                      ? yox.url
                      : "https://pbs.twimg.com/profile_images/1310693973464416257/hsA1diiN_400x400.jpg"
                  }
                  alt={yox.titulo}
                  style={{ width: "105%", height: "300px" }}
                />
                <h5>{yox.titulo}</h5>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YoxCard;
