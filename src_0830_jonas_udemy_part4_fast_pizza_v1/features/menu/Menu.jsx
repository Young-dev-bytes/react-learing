import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  console.log("menu");
  const menu = useLoaderData();

  useEffect(() => {
    console.log("menu effect");
  }, []);
  return (
    <ul>
      {menu.map((pizza) => {
        return <MenuItem key={pizza.id} pizza={pizza} />;
      })}
    </ul>
  );
}

export async function loader() {
  const menuList = await getMenu();
  console.log("menuList", menuList);
  return menuList;
}

export default Menu;
