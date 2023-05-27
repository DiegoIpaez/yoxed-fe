"use client"
import React, { useEffect, useState } from "react";
import { getYoxs } from "../services/yoxs.service";
import YoxCard from "../components/YoxCard";

const Home = () => {
  const [yox, setYox] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    getYoxs().then((res) => {
      setYox({
        data: res.yoxs,
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