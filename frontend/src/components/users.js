import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserList = ({ updateUser, user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/getUsers");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/deleteUser/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (user) => {
    // passing the prop from child to parent
    updateUser(user);
  };

  const viewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  return (
    <div className="d-flex flex-column mt-4 w-75 m-2">
      <button className="btn btn-primary" onClick={fetchUsers}>
        {loading ? "Loading..." : "Show Users"}
      </button>
      <ul className="list-group mt-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.firstName} {user.lastName}
            <div className="d-flex justify-content-around gap-3 ">
              <button
                className="btn btn-info btn-sm mr-2"
                onClick={() => viewUser(user)}
              >
                View
              </button>
              <button
                className="btn btn-warning btn-sm mr-2"
                onClick={() => editUser(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>
                <strong>First Name:</strong> {selectedUser.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedUser.lastName}
              </p>
              <p>
                <strong>State:</strong> {selectedUser.state}
              </p>
              <p>
                <strong>District:</strong> {selectedUser.district}
              </p>
              <p>
                <strong>Village:</strong> {selectedUser.village}
              </p>
              <p>
                <strong>PAN Number:</strong> {selectedUser.panNumber}
              </p>
              <p>
                <strong>Aadhaar Number:</strong> {selectedUser.aadhaarNumber}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
