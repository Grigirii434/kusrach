import React from 'react';

export default function Cart({ cart, setCart, onOrder }) {
  // Увеличить количество
  const increaseQuantity = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // Уменьшить количество (не меньше 1)
  const decreaseQuantity = (id) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ));
  };

  // Удалить товар из корзины
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Подсчет общей суммы
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h3>Корзина</h3>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <span>{item.title}</span>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <span>{item.price * item.quantity} ₽</span>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>×</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <b>Итого: {total} ₽</b>
          </div>
          <button className="order-btn" onClick={onOrder}>Оформить заказ</button>
        </>
      )}
    </div>
  );
}
