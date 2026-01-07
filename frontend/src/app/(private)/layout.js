"use client";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader"; // Import your loader component
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/utils";
import { useDispatch } from "react-redux";
import { getUserData } from "@/store/slices/userSlice";

export default function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  async function fetchData() {
    setIsLoading(true);
    await dispatch(getUserData())
      .unwrap()
      .then(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const authToken = getLocalStorage("authToken");

    if (!authToken) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router,dispatch]);

  if (isLoading) return <Loader />;  

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
