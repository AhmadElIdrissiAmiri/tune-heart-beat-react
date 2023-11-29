import React, { Link, useState, useEffect } from "react";
import * as client from "./client";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill }
  from "react-icons/bs";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", role: "USER" });
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };


  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
      <h1>User List</h1>
      <div style={{ height: "580px", overflowY: "auto" }}>
        <table className="table">
          <thead>
            <tr>

              <th>Username</th>
              <th>password</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>DOB</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Add New User</th>
              <th>Update</th>
             
            </tr>


            <tr>

              <td>
                <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />

              </td>
              <td>
                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
              </td>
              <td>
                <input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
              </td>
              <td>
                <input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
              </td>
              <td>
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              </td>
              <td>
                <input type="date" value={user.dob} onChange={(e) => setUser({ ...user, dob: e.target.value })} />
              </td>
              <td>
                <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="ARTIST">Artist</option>
                 
                </select>
              </td>
              <td></td>
              <td></td>
              <td>
                <button onClick={createUser} >
                  <BsPlusCircleFill />
                </button>
              </td>
              <td>
                <button onClick={updateUser}
                  className="me-2 text-success fs-1 text" >
                  <BsFillCheckCircleFill />
                </button>

               
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>

{/* <Link to={`/users/account/${user._id}`}>
          {user.username}
        </Link> */}

                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.dob}</td>
                <td>{user.role}</td>
                <td><button className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectUser(user)} />
                </button> </td>
                <td> <button onClick={() => deleteUser(user)}>
                  <BsTrash3Fill />
                </button></td>
                <td></td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default UserTable;