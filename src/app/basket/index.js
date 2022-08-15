import List from '../../components/list';
import React, { useCallback } from 'react';
import BasketTotal from '../../components/basket-total';
import LayoutModal from '../../components/layout-modal';
import ItemBasket from '../../components/item-basket';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import { Link } from 'react-router-dom';

function Basket({ words, language }) {
  const store = useStore();

  const select = useSelector((state) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback((_id) => store.get('basket').removeFromBasket(_id), []),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => (
        <ItemBasket
          words={words}
          language={language}
          close={callbacks.closeModal}
          item={item}
          onRemove={callbacks.removeFromBasket}
        />
      ),
      [],
    ),
  };

  return (
    <LayoutModal
      title={language === 'ru' ? words.ru.cart : words.eng.cart}
      onClose={callbacks.closeModal}>
      <List items={select.items} renderItem={renders.itemBasket} />
      <BasketTotal words={words} language={language} sum={select.sum} />
    </LayoutModal>
  );
}

export default React.memo(Basket);
