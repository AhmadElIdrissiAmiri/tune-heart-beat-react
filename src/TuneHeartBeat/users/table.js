import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import {
  BsFillCheckCircleFill,
  BsPencil,
  BsTrash3Fill,
  BsPlusCircleFill,
} from "react-icons/bs";
import * as client from "./client";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const selectUser = async (selectedUser) => {
    try {
      const selected = await client.findUserById(selectedUser._id);
      setUser(selected);
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
      setUser({ username: "", password: "", role: "USER" });
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async () => {
    try {
      await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
      setUser({ username: "", password: "", role: "USER" });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (selectedUser) => {
    try {
      await client.deleteUser(selectedUser);
      setUsers(users.filter((u) => u._id !== selectedUser._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <div style={{ height: "580px", overflowY: "auto" }}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Add New User</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Control
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </td>
              <td>
                <Form.Control
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </td>
              <td>
                <Form.Control
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
              </td>
              <td>
                <Form.Control
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />
              </td>
              <td>
                <Form.Control
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  value={user.dob}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                />
              </td>
              <td>
                <Form.Select
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="ARTIST">Artist</option>
                </Form.Select>
              </td>
              <td></td>
              <td></td>
              <td>
                <Button onClick={createUser} variant="success">
                  <BsPlusCircleFill />
                </Button>
              </td>
              <td>
                <Button onClick={updateUser} variant="primary">
                  <BsFillCheckCircleFill />
                </Button>
              </td>
            </tr>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{new Date(user.dob).toISOString().split("T")[0]}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="warning" onClick={() => selectUser(user)}>
                    <BsPencil />
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteUser(user)}>
                    <BsTrash3Fill />
                  </Button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserTable;
