import React, { useEffect, useState } from "react";
import { getYoxs } from "../helpers/yoxs";
import YoxCard from "../components/YoxCard";

const Home = () => {
  const [yox, setYox] = useState({
    datos: [],
    loading: true,
  });

  useEffect(() => {
    getYoxs().then((res) => {
      setYox({
        datos: res.yoxs,
        loading: false,
      });
    });
  }, []);

  return (
    <div className="container-fluid">
      <YoxCard yox={yox} />
    </div>
  );
};

export default Home;
