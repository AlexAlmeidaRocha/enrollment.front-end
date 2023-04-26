import Menu from '../Menu';
import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';
import AlterUserForm from './components/AlterUserForm';
import userApi from '../../api/user.api';

function User() {

  //Add
  const [add, setAddUser] = useState(false)

  const [users, setUser] = useState([])

  //Alterar
  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, name: '', email: '', password: '' }

  const [currentUser, setCurrentUser] = useState(initialFormState)

  const editRow = user => {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, email: user.email, profile: user.profile })
  }

  //Get
  const getusers = () => {
    userApi.getAll().then(result => {

      if (result.status === 200 && result.data.length > 0) {
        setUser(result.data);
      }
    });
  }
  useEffect(() => {
    getusers();
  }, [])

  return (
    <>
      <Menu />
      {
        editing ? (
          <AlterUserForm
            setEditing={setEditing}
            currentUser={currentUser}
            getusers={getusers}
          />
        ) : add ? (
          <AddUserForm
            setAddUser={setAddUser}
            getusers={getusers}
          />
        ) : <UserTable
          setAddUser={setAddUser}
          users={users}
          getusers={getusers}
          editRow={editRow}
        />
      }
    </>
  );
}

export default User;