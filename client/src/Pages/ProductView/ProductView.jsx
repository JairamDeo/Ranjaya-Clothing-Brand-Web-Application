// src/Pages/ProductView/ProductView.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductViewComponent from '../../components/ProductViewComponent';

export default function ProductView() {
  // Get the product ID from URL parameters
  const { id } = useParams();
  
  return (
    <main>
      <ProductViewComponent productId={id} />
    </main>
  );
}