import React, { useEffect, useState } from 'react';
import './Catalog.css'; // Подключаем отдельный файл стилей
import { useParams, NavLink } from 'react-router-dom';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <span className="cart-count">0</span>
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
                      <button className="add-to-cart-btn">
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

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>О нас</h3>
              <p>Fashion Store - это магазин модной одежды для тех, кто ценит стиль и качество.</p>
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