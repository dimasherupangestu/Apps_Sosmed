import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { DetailStatusPages } from "./pages/DetailStatusPages";
import { Search } from "./pages/Search";
import { FollowerPage } from "./pages/FollowerPage";
import { ProlifePages } from "./pages/ProlifePages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />

        <Route path="/follower" element={<FollowerPage />} />

        <Route path="/profile" element={<ProlifePages />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/detailStatus/:id" element={<DetailStatusPages />} />
      </Routes>
      {/* <Home /> */}
    </>
  );
}

export default App;
