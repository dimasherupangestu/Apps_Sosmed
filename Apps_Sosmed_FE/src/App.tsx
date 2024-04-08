import { Route, Routes } from "react-router-dom";
import "./App.css";
import { DetailStatusPages } from "./pages/DetailStatusPages";
import { EditProfilePage } from "./pages/EditProfilePages";
import { FollowerPage } from "./pages/FollowerPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ProlifePages } from "./pages/ProlifePages";
import { Register } from "./pages/Register";
import { Search } from "./pages/Search";

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
        <Route path="/editprofile/:id" element={<EditProfilePage />} />

        <Route path="/logout" element={<Login />} />
        <Route path="/detailStatus/:id" element={<DetailStatusPages />} />
      </Routes>
      {/* <Home /> */}
    </>
  );
}

export default App;
