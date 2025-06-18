import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={`http://localhost:8000${product.image}`} 
          alt={product.title}
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg'; // Запасное изображение
          }}
        />
      </div>
      <h3>{product.title}</h3>
      <p>{product.price} ₽</p>
    </div>
  );
};

export default ProductCard;