import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { connect } from "react-redux";

import { getAllUsers } from "../../../action/userAction";
import UpdateModal from "../updateModal/UpdateModal";
import User from "./User";

function UsersPage({ infoAdminGetUsers, getAllUsers }) {
  const { getUsersLoading, users } = infoAdminGetUsers;

  const [currentUsers, setCurrentUsers] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateUser, setUpdateUser] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (users && users.length !== 0) {
      setCurrentUsers(users);
    }
  }, [users]);

  const handleActions = (type, _user) => {
    setIsShowModal(!isShowModal);
    if (type === "delete") {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
    setUpdateUser(_user);
  };

  const handleCloseModal = () => {
      setIsShowModal(false);
  }

  let body;

  if (getUsersLoading) {
    body = <Spinner animation="border" variant="danger" size="lg" className=' text-center m-auto'/>;
  } else {
    body = (
      <Container>
        <h3>Danh sach tat ca nguoi dung :</h3>

        <Table bordered hover>
          <thead>
            <tr>
              <th>Stt</th>
              <th>Username</th>
              <th>Email</th>
              <th>isAdmin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers &&
              currentUsers.map((user, index) => (
                <User
                  key={user._id}
                  user={user}
                  stt={index}
                  onActions={handleActions}
                />
              ))}
          </tbody>
        </Table>
        {isShowModal && (
          <UpdateModal
            isShow={isShowModal}
            isUpdate={isUpdate}
            updateUser={updateUser}
            onClose = {handleCloseModal}
          />
        )}
      </Container>
    );
  }

  return <div>{body}</div>;
}

const mapStateToProps = (state) => ({
  infoAdminGetUsers: state.adminGetUsers,
});

export default connect(mapStateToProps, { getAllUsers })(UsersPage);
