import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const User = ({ user, stt, onActions }) => {
  const { user: _user } = useSelector((state) => state.userAuth);

  const handleActions = (type, _user) => {
    onActions && onActions(type, _user);
  };

  return (
    <>
      {user.username !== _user.username && (
        <tr>
          <td>{stt}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin.toString()}</td>
          <td>
            <Button
              variant="danger"
              onClick={() => handleActions("delete", user)}
            >
              Delete
            </Button>
            <Button
              variant="success"
              className="mx-2"
              onClick={() => handleActions("update", user)}
            >
              Update
            </Button>
          </td>
        </tr>
      )}
    </>
  );
};

export default User;
