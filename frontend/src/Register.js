import React, { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/auth/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
      .then(res => {
        if (res.ok) {
          setMessage('Регистрация прошла успешно');
          setUsername('');
          setEmail('');
          setPassword('');
        } else {
          setMessage('Ошибка при регистрации');
        }
      })
      .catch(() => setMessage('Ошибка сети'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Логин" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
      <p>{message}</p>
    </form>
  );
}