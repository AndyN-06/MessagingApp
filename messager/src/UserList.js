import React, { useEffect, useState } from 'react';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3001/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onSelectUser(user.id)}>
          {user.username}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
