import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import {
  decreaseQuantity,
  increaseQuantity,
  getItemQuantity,
} from './cartSlice';

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  const quantity = useSelector(getItemQuantity(pizzaId));
  const handleDecreaseCart = () => {
    dispatch(decreaseQuantity(pizzaId));
  };
  const handleIncreaseCart = () => {
    dispatch(increaseQuantity(pizzaId));
  };
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecreaseCart}>
        -
      </Button>
      <span>{quantity}</span>
      <Button type="round" onClick={handleIncreaseCart}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
