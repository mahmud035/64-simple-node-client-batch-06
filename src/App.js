import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  console.log(users);

  const handleAddUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.log('Error:', error));

    form.reset();
  };

  return (
    <div className="App">
      <h1>Users: {users.length}</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <button type="submit">Add User</button>
      </form>

      <div>
        {users.map((user, index) => (
          <p key={index}>
            {user.name}, {user.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
