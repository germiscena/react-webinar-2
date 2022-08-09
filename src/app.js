import React from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import Cart from './components/cart';
import { counter } from './utils';
import { array } from 'prop-types';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const cart = store.getState().cart;
  const [cartOpen, setCartOpen] = React.useState(false);

  const callbacks = {
    addCart: React.useCallback((code, item) => {
      store.addCart(code, item);
    }, []),
    deleteCart: React.useCallback((code) => {
      store.deleteCart(code);
    }, []),
    cartToggle: React.useCallback(() => {
      setCartOpen(!cartOpen);
    }),
    cutting: React.useCallback((num) => {
      num = String(num).split('');
      num = num.reverse();
      let count = Math.round(num.length / 3);
      for (let i = 3; i <= count * 4; ) {
        num.splice(i, 0, ' ');
        i = i + 4;
      }
      return num.reverse().join('');
    }),
  };
  let totalPrice = 0;
  if (cart) {
    totalPrice = cart
      .map((item) => item.price * item.amount)
      .reduce((prev, value) => prev + value, 0);
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      {cartOpen && (
        <Cart
          cutting={callbacks.cutting}
          cart={cart}
          totalPrice={totalPrice}
          cartToggle={callbacks.cartToggle}
          cartDelete={callbacks.deleteCart}
        />
      )}
      <Controls
        cartToggle={callbacks.cartToggle}
        cutting={callbacks.cutting}
        price={totalPrice}
        cart={cart}
      />
      <List
        cutting={callbacks.cutting}
        addCart={callbacks.addCart}
        deleteCart={callbacks.deleteCart}
        items={store.getState().items}
      />
    </Layout>
  );
}

export default App;
