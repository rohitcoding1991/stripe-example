/* eslint-disable @next/next/no-img-element */
"use client";

import Loader from "@/components/Loader";
import { buyProduct } from "@/store/slices/paymentSlice";
import { Backdrop, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductsContent() {
  const products = [
    {
      id: 1,
      brand: "brand",
      name: "Product 1",
      price: "149",
      maxPrice: "199",
      image:
        "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      brand: "brand",
      name: "Product 2",
      price: "159",
      maxPrice: "199",
      image:
        "https://images.unsplash.com/photo-1651950519238-15835722f8bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      brand: "brand",
      name: "Product 3",
      price: "169",
      maxPrice: "199",
      image:
        "https://images.unsplash.com/photo-1651950537598-373e4358d320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      brand: "brand",
      name: "Product 4",
      price: "179",
      maxPrice: "199",
      image:
        "https://images.unsplash.com/photo-1651950540805-b7c71869e689?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 5,
      brand: "brand",
      name: "Product 5",
      price: "189",
      maxPrice: "199",
      image:
        "https://images.unsplash.com/photo-1649261191624-ca9f79ca3fc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 6,
      brand: "brand",
      name: "Product 6",
      price: "139",
      maxPrice: "199",
      image:
        "https://images.unsplash.com/photo-1649261191606-cb2496e97eee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleBuyNow = async (product) => {
    setOpen(true);
    setLoading(true);
    const productData = {
      productName: product.name,
      amount: product.price,
    };
    try {
      dispatch(buyProduct({productData}))
        .unwrap()
        .then((res) => {
          console.log(res, "resFromBuyProducts");
          router.push(res.data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  };

  if(loading){
    return <Loader/>
  }
  return (
    <>
      {/* title */}
      <div className="!text-center p-10">
        <h1 className="font-bold text-4xl mb-4">
          One Time Payment Demo
        </h1>
        <h2 className="text-lg max-w-[500px] mx-auto">
        Explore a selection of products, each with a convenient Buy Now button. Simply click to be redirected to Stripe&apos;s secure payment page and complete your one-time purchase effortlessly.</h2>
      </div>
      {/* ✅ Grid Section - Starts Here 👇 */}
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products.map((product) => (
          <div
            className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
            key={product.id}
          >
            <Link href="#">
              <img
                src={product.image}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product.brand}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize">
                  {product.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product.price}
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                      ${product.maxPrice}
                    </p>
                  </del>
                  <div className="ml-auto">
                    <button
                      className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2 rounded-lg"
                      onClick={() => {
                        handleBuyNow(product);
                      }}
                    >
                      <span className="relative z-10 text-green-500 group-hover:text-white text-sm duration-500">
                        Buy Now
                      </span>
                      <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                      <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        <Backdrop
          sx={(theme) => ({ color: "#000", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress color="#000" />
        </Backdrop>
      </section>
      {/* 🛑 Grid Section - Ends Here */}
      {/* credit */}
    </>
  );
}
