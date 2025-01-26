import { useLoaderData } from "react-router-dom";
import { getCartList } from "../utilites/addToCartList";
import { useEffect, useState } from "react";
import ListedComponent from "../ListedComponent/ListedComponent";

const Cart = () => {
  const [cartList, setCartList] = useState([]);

  const products = useLoaderData();
  useEffect(() => {
    const cartList = getCartList();
    const cartId = cartList.map((id) => parseInt(id));

    const cartListedProducts = products.filter((product) =>
      cartId.includes(product.product_id)
    );
    setCartList(cartListedProducts);
  }, [products]);
  console.log(cartList);
  return (
    <div>
      {cartList.map((product) => (
        <ListedComponent 
        key={product.product_id}
        product={product}
        ></ListedComponent>
      ))}
    </div>
  );
};

export default Cart;
