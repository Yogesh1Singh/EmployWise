import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/edit/:id" element={<EditUser />} />
    </Routes>
  );
}

export default App;
