import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../components/NavBar";
import CategoriaId from "../pages/CategoriaId";
import Home from "../pages/Home";
import Login from "../pages/Login";
import YoxId from "../pages/YoxId";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/categId/:id" component={CategoriaId} />
        <Route exact path="/yoxId/:id" component={YoxId} />
      </Switch>
    </Router>
  );
}

export default App;
