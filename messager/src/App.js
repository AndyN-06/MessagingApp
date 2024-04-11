import './App.css';
import React, { useState } from 'react';
import Registration from './Registration';
import UserList from './UserList';
import Chat from './Chat';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      {!userId ? (
        <Registration onRegister={setUserId} />
      ) : (
        <>
          <UserList onSelectUser={setSelectedUser} />
          {selectedUser && <Chat userId={userId} selectedUser={selectedUser} />}
        </>
      )}
    </div>
  );
};

export default App;

