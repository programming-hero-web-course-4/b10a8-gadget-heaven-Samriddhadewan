import { useLoaderData, useNavigate } from "react-router-dom";
import { clearCartList, getCartList } from "../utilites/addToCartList";
import { useEffect, useState } from "react";
import ListedComponent from "../ListedComponent/ListedComponent";
import success from "../../assets/Group.png"
const Cart = () => {
  const navigate = useNavigate();
  const products = useLoaderData();
  const [cartList, setCartList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cartList = getCartList();
    const cartId = cartList.map((id) => parseInt(id));

    const cartListedProducts = products.filter((product) =>
      cartId.includes(product.product_id)
    );
    setCartList(cartListedProducts);
  }, [products]);

  const handleSort = () => {
    console.log("HANDLE SORT CLICKED");
    const sorted = [...cartList].sort((a, b) => b.price - a.price);
    setCartList(sorted);
  };

  const totalPrice = cartList.reduce((sum, product) => sum + product.price, 0);

  const handlePurchaseBtn = () => {
    setIsModalOpen(false);
    clearCartList();
    navigate("/");
  };

  return (
    <div>
      <div className="flex items-center my-5 justify-between">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-semibold">Total Cost : {totalPrice}$</h1>
          <button
            onClick={() => handleSort()}
            className="text-[#9538E2] flex gap-3 rounded-full border border-[#9538E2] px-3 py-3"
          >
            Sort By Price
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_13_2554)">
                <path
                  d="M4 10C4 10.5304 4.21071 11.0391 4.58579 11.4142C4.96086 11.7893 5.46957 12 6 12C6.53043 12 7.03914 11.7893 7.41421 11.4142C7.78929 11.0391 8 10.5304 8 10C8 9.46957 7.78929 8.96086 7.41421 8.58579C7.03914 8.21071 6.53043 8 6 8C5.46957 8 4.96086 8.21071 4.58579 8.58579C4.21071 8.96086 4 9.46957 4 10Z"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 4V8"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 12V20"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 16C10 16.5304 10.2107 17.0391 10.5858 17.4142C10.9609 17.7893 11.4696 18 12 18C12.5304 18 13.0391 17.7893 13.4142 17.4142C13.7893 17.0391 14 16.5304 14 16C14 15.4696 13.7893 14.9609 13.4142 14.5858C13.0391 14.2107 12.5304 14 12 14C11.4696 14 10.9609 14.2107 10.5858 14.5858C10.2107 14.9609 10 15.4696 10 16Z"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 4V14"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18V20"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 7C16 7.53043 16.2107 8.03914 16.5858 8.41421C16.9609 8.78929 17.4696 9 18 9C18.5304 9 19.0391 8.78929 19.4142 8.41421C19.7893 8.03914 20 7.53043 20 7C20 6.46957 19.7893 5.96086 19.4142 5.58579C19.0391 5.21071 18.5304 5 18 5C17.4696 5 16.9609 5.21071 16.5858 5.58579C16.2107 5.96086 16 6.46957 16 7Z"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 4V5"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 9V20"
                  stroke="#8332C5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_13_2554">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button disabled={cartList.length === 0}
            onClick={() => setIsModalOpen(true)}
            className="text-white rounded-full px-5 py-3 bg-[#9538E2]"
          >
            Purchase
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box  text-center">
            <div className="flex   justify-center">
            <img className="" src={success} alt="" />
            </div>
            <h1 className="text-[#09080f] my-4 font-bold text-2xl ">Payment Successful</h1>
            <hr className="" />
            <div className="my-4 text-[#09080F99]">
              <h1>Thanks for purchasing</h1>
              <p>total: {totalPrice}$</p>
            </div>
            <div className="modal-action flex justify-center">
              <button onClick={()=> handlePurchaseBtn()} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {cartList.map((product) => (
        <ListedComponent key={product.product_id} product={product}></ListedComponent>
      ))}
    </div>
  );
};

export default Cart;
