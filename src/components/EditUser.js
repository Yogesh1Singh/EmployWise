import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // ✅ Step 1: Fetch User Data (Local Storage ya API se)
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find((u) => u.id === parseInt(id));

    if (foundUser) {
      setUser(foundUser);
    } else {
      axios.get(`https://reqres.in/api/users/${id}`)
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => console.error("Fetch Error:", error));
    }
  }, [id]);

  // ✅ Step 2: Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Step 3: Update User Function
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Sending Update Request:", user);

    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
      console.log("Update Response:", response.data);

      if (response.status === 200) {
        alert("User Updated Successfully!");

        // ✅ Local Storage Me Updated Data Save Karo
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.map((u) => (u.id === parseInt(id) ? { ...u, ...user } : u));
        localStorage.setItem("users", JSON.stringify(users));

        navigate("/users"); // ✅ Redirect back to user list
      } else {
        alert("Update Failed!");
      }
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      alert("Update Failed!");
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="first_name" value={user.first_name} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="last_name" value={user.last_name} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
