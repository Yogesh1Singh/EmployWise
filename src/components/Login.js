import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 Import navigation hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 👈 Navigation function

  const handleLogin = async () => {
    try {
      console.log("Sending Login Request:", { email, password });

      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      console.log("Server Response:", response.data); // Debugging

      if (response.data.token) {
        alert("Login Successful!");
        navigate("/users"); // 👈 Redirect to UserList page
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Server Error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
