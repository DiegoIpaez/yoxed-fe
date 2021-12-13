import React from "react";

const BotonPag = ({ totPag, pagina, setPagina, limite = 4 }) => {
  let total = totPag;

  const nextPag = () => {
    if (total > pagina + limite) {
      setPagina(pagina + limite);
    }
  };

  const prevPag = () => {
    if (pagina > 0) {
      setPagina(pagina - limite);
    }
  };

  return (
    <>
      <button
        className="btn me-2"
        style={{color:"black", border: "1px solid black", borderRadius:"20px"}}
        onClick={prevPag}
        disabled={pagina === 0 ? true : false}
      >
        <i className="fa fa-chevron-left"></i>
       
      </button>
      <button
        className="btn"
        style={{color:"black", border: "1px solid black", borderRadius:"20px"}}
        disabled={total - (pagina + limite) <= 0 ? true : false}
        onClick={nextPag}
      >
        <i className="fa fa-chevron-right"></i> 
        
      </button>
    </>
  );
};

export default BotonPag;
