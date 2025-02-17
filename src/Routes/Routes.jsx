import {
    createBrowserRouter,
  } from "react-router-dom";
import Mainlayout from "../Layouts/Mainlayout/Mainlayout";
import Dashboard from "../Components/Dashboard/Dashboard";
import Home from "../Components/Home/Home";
import Statistics from "../Components/Statistics/Statistics";
import GadgetCards from "../Components/GadgetCards/GadgetCards";
import GadgetDetails from "../Components/GadgetDetails/GadgetDetails";
import Cart from "../Components/Cart/Cart";
import Wishlist from "../Components/WishList/Wishlist";
import Error from "../Components/error/Error";
import Faq from "../Components/Faq/Faq";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout></Mainlayout>,
      errorElement: <Error />,
      children : [
        {
            path: "/",
            element: <Home></Home>,
            loader: ()=> fetch('/categories.json'),
            children: [
              {
                path: "/",
                element: <GadgetCards></GadgetCards>,
                loader: ()=> fetch('/gadgets.json')
              },
              {
                path: "/category/:category",
                element: <GadgetCards></GadgetCards>,
                loader: ()=> fetch('/gadgets.json')
              },
            ]
        },
        {
            path: "/dashboard",
            element: <Dashboard></Dashboard>,
            children: [
              {
                path: "/dashboard",
                element: <Cart></Cart>,
                loader: () =>fetch('/gadgets.json')
              },
              {
                path: "/dashboard/wishlist",
                element: <Wishlist></Wishlist>,
                loader: () =>fetch('/gadgets.json')
              }
            ]
        },
        {
            path: "/statistics",
            element: <Statistics />,
            loader: () => fetch('/gadgets.json'),
        },
        {
            path: "/gadgets/gadget/:id",
            element: <GadgetDetails />,
            loader: () => fetch('/gadgets.json')
        },
        {
            path: "/faq",
            element: <Faq />,
        }
    ]
    },
  ]);

  export default router