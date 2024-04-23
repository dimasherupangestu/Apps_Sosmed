import { Route, Routes } from "react-router-dom";
import { DetailStatusPages } from "./pages/DetailStatusPages";
import { EditProfilePage } from "./pages/EditProfilePages";
import { FollowerPage } from "./pages/FollowerPage";
import { Home } from "./pages/Home";
import { ProlifePages } from "./pages/ProlifePages";
import { Register } from "./pages/Register";
import { Search } from "./pages/Search";
import { Login } from "./pages/LoginPages";

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
    </>
  );
}

export default App;
