import "./app.css";
import "@fontsource-variable/hanken-grotesk/wght.css";
import "@fontsource-variable/hanken-grotesk/wght-italic.css";

import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";

import { Toaster } from "./components/toast";
const Index = lazy(() => import("./routes/_index"));
const Auth = lazy(() => import("./routes/auth"));

const App = () => {
  return (
    <>
      <Router>
        <Route path="/" component={Index} />
        <Route path="/auth" component={Auth} />
      </Router>
      <Toaster />
    </>
  );
};

export default App;
