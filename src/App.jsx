import React from 'react';
import Routes from './Routes';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';
import FloatingCartButton from './components/ui/FloatingCartButton';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Routes />
        <FloatingCartButton />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
