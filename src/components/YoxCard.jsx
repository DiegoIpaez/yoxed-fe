import React from "react";
import Link from "next/link";

const YoxCard = ({ yox }) => {
  return (
    <>
      {yox.loading ? (
        <h1 className="text-center mt-5">Cargando...</h1>
      ) : (
        <div className="row">
          {yox.data.map((yox) => (
            <div
              className="col-xl-2 col-lg-4 col-md-6 col-6 ps-0 pe-0 mt-1"
              key={yox._id}
              style={{ position: "relative" }}
            >
              <Link href={`/yox/${yox._id}`}>
                <img
                  src={
                    yox.url
                      ? yox.url
                      : "https://pbs.twimg.com/profile_images/1310693973464416257/hsA1diiN_400x400.jpg"
                  }
                  alt={yox.titulo}
                  style={{ width: "99%", height: "230px", borderRadius: "5px" }}
                />
                <h6
                  className=" ms-2 mt-1 ps-1 pe-1 text-white"
                  style={{
                    position: "absolute",
                    top: "0",
                    backgroundColor: "red",
                    borderRadius: "7px",
                  }}
                >
                  {yox.categoria["nombre"]}
                </h6>
                <h5
                  className="text-white ps-2"
                  style={{ position: "absolute", bottom: "0" }}
                >
                  {yox.titulo}
                </h5>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default YoxCard;
