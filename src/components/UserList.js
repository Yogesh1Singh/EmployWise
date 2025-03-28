import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users");
      setUsers(response.data.data);
      localStorage.setItem("users", JSON.stringify(response.data.data));
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      fetchUsers();
    }
  }, []);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>User List</h2>
      <table border="1" cellPadding="10" cellSpacing="0" width="80%" align="center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} align="center">
              <td>{user.id}</td>
              <td>
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  width="50"
                  height="50"
                  style={{ borderRadius: "50%" }}
                />
              </td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`}>
                  <button style={{ marginRight: "5px", backgroundColor: "green", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
