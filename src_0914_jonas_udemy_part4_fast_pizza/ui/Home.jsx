import { useEffect } from 'react';
import CreateUser from '../features/user/CreateUser';
import { useLoaderData } from 'react-router-dom';

function Home() {
  console.log('home');
  const homeLoader = useLoaderData();
  console.log('home-loaderdata', homeLoader);
  useEffect(() => {
    console.log('home effect');
  }, []);
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-5  text-xl font-semibold md:text-3xl">
        This is Young, The best pizza. Welcome to you
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
