import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";

import { Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
