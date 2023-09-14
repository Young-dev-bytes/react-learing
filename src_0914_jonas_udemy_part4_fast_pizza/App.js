import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';

import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Cart from './features/cart/Cart';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import { getMenu } from './services/apiRestaurant';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    loader: async () => {
      console.log('applayout loader');
      return 'test';
    },
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async () => {
          console.log('home loader');
          return 'test';
        },
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
        loader: async () => {
          console.log('cart loader');
          await getMenu();
          console.log('cart loader finish');
          return 'test';
        },
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
