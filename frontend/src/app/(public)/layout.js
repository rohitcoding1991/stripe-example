"use client";

import Loader from "@/components/Loader"; // Import your loader component
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/utils";

export default function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authToken = getLocalStorage("authToken");
    
    if (authToken !== null) {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return <Loader />;  

  return (
    <>
      {children}
    </>
  );
}
