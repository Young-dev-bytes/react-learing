import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ children, pizzaId }) {
  const dispatch = useDispatch();
  const handleDeleteItem = () => {
    dispatch(deleteItem(pizzaId));
  };
  return (
    <Button type="small" onClick={handleDeleteItem}>
      {children}
    </Button>
  );
}

export default DeleteItem;
