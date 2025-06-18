import React, { useEffect, useState } from 'react';
import './Catalog.css';
import { useParams, NavLink } from 'react-router-dom';
import Cart from './Cart';
import './Cart.css';
export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    // Попытка загрузить корзину из localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const handleOrder = () => {
  if (cart.length === 0) {
    alert('Корзина пуста!');
    return;
  }

  // Подготовим данные для отправки
  const orderData = {
    items: cart.map(({ id, quantity }) => ({ product_id: id, quantity })),
  };

  fetch('http://127.0.0.1:8000/api/orders/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(res => {
      if (!res.ok) throw new Error('Ошибка при оформлении заказа');
      return res.json();
    })
    .then(data => {
      alert(`Заказ успешно оформлен! Номер заказа: ${data.order_id || data.id || 'неизвестен'}`);
      setCart([]); // Очистим корзину
    })
    .catch(err => {
      console.error(err);
      alert('Ошибка при оформлении заказа, попробуйте позже.');
    });
};
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/catalog/products/')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // При изменении корзины сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Функция добавления товара в корзину
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        // Если товар уже есть, увеличиваем количество
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Если товара нет, добавляем с quantity = 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Считаем общее количество товаров в корзине
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="catalog-container">
      <header className="header">
        <div className="container">
          <h1 className="logo">Мужицкий магазин</h1>
          <nav className="nav">
            <a href="#" className="nav-link">Главная</a>
            <a href="#" className="nav-link">Каталог</a>
            <a href="#" className="nav-link">О нас</a>
            <a href="#" className="nav-link">Контакты</a>
            <div className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartCount}</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <h2 className="section-title">Каталог товаров</h2>
          
          {loading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          ) : (
            <div className="products-grid">
              {products.map(p => (
                <div key={p.id} className="product-card">
                  <div className="product-image-container">
                    {p.image && (
                      <img 
                        src={`${p.image}`} 
                        alt={p.title} 
                        className="product-image"
                      />
                    )}
                    <button className="wishlist-btn">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{p.title}</h3>
                    <p className="product-description">{p.description}</p>
                    <div className="product-footer">
                      <span className="product-price">{p.price} ₽</span>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(p)}
                      >
                        <i className="fas fa-shopping-cart"></i> В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Cart cart={cart} setCart={setCart} onOrder={handleOrder} />         
      {/* Пока просто покажем корзину ниже каталога */}
      

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>О нас</h3>
              <p>Мужицкий магазин - это магазин модной одежды для тех, кто ценит стиль и качество.</p>
            </div>
            <div className="footer-section">
              <h3>Контакты</h3>
              <p><i className="fas fa-map-marker-alt"></i> г. Москва, ул. Примерная, 123</p>
              <p><i className="fas fa-phone"></i> +7 (123) 456-78-90</p>
              <p><i className="fas fa-envelope"></i> info@fashionstore.ru</p>
            </div>
            <div className="footer-section">
              <h3>Соцсети</h3>
              <div className="social-links">
                <a href="#"><i className="fab fa-vk"></i></a>
                <a href="#"><i className="fab fa-telegram"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>© 2023 Fashion Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
