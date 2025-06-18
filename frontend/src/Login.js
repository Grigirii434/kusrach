import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/auth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.access) {
          localStorage.setItem('token', data.access);
          setMessage('Вход успешен');
        } else {
          setMessage('Неверный логин или пароль');
        }
      })
      .catch(() => setMessage('Ошибка сети'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Логин" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" required />
      <button type="submit">Войти</button>
      <p>{message}</p>
    </form>
  );
}