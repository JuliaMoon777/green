import React from 'react';
import { SnackHero } from './components/SnackHero';
import { GreenergyProduct } from './data/flavors';

export default function App() {
  const handleProductSelect = (product: GreenergyProduct) => {
    // Przejście do następnej karty / podstrony produktu
    if (product.targetUrl) {
      window.open(product.targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="h-screen w-full relative bg-[#121113] overflow-hidden font-sans">
      {/* Główny pełnoekranowy 3D Slider dla Greenergy Let's Raw (Chrupiący bób fava) */}
      <SnackHero onProductClick={handleProductSelect} />
    </div>
  );
}
