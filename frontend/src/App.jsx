import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import { Toaster } from "react-hot-toast";
import Getjournals from "./components/get-journals";
function App() {
  return (
    <div className="bg-neutral-950 min-h-screen  text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/journals" element={<Getjournals />} />
      </Routes>
    </div>
  );
}

export default App;
