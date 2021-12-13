import React from "react";

const Comentario = ({ comentarioId, totalComent, userYox }) => {
  return (
    <>
      <div
        className="row pt-2 pb-2 mb-1 text-white"
        style={{ backgroundColor: "black", borderRadius: "9px" }}
      >
        <h5>Comentarios({totalComent})</h5>
      </div>
      {comentarioId.map((comentario) => (
        <div
          className="row pt-2 pb-2 text-white"
          style={{
            backgroundColor: "black",
            paddingLeft: "0",
            paddingRight: "0",
            borderRadius: "10px",
          }}
          key={comentario._id}
        >
          <div className="col-1">
            <img
              style={{ width: "100%", height: "50px", borderRadius: "7px" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2KJta8kWIZZuPXXKTB4LuhCDjh-yiecCt9BSBJ0WAAhFogOyBfZuTn8hlegwNRRFnShk&usqp=CAU"
              alt=""
            />
          </div>
          <div className="col-11">
            <h6>
              User
              {comentario.usuario === userYox.uid ? (
                <>
                  {comentario.usuario} <span style={{ color: "red" }}>OP</span>{" "}
                </>
              ) : (
                <>{comentario.usuario}</>
              )}
            </h6>
            <p>{comentario.comentario}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comentario;
