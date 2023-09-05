import { useEffect } from 'react';
import CreateUser from '../features/user/CreateUser';
import { useSelector } from 'react-redux';
import Button from './Button';

function Home() {
  console.log('home');
  const username = useSelector((state) => state.user.username);
  useEffect(() => {
    console.log('home effect');
  }, []);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-5  text-xl font-semibold md:text-3xl">
        this is a test , The best pizza.this is a test ,
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.this is a test ,
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
