import { useEffect } from 'react';
import { getUser } from './userSlice';
import { useSelector } from 'react-redux';

function Username() {
  console.log('username');
  const { username } = useSelector(getUser);
  useEffect(() => {
    console.log('username effect');
  }, []);

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
