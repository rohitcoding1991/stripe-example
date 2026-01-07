/* eslint-disable @next/next/no-img-element */
"use client";
import { logout } from "@/store/slices/userSlice";
import { clearLocalStorage, getLocalStorage } from "@/utils";
import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const authToken = getLocalStorage("authToken") || null;

  const handleLogout = async () => {
    try {
      await dispatch(logout())
      .unwrap()
      .then(() => {
        clearLocalStorage();
        toast.success("Logout Successful!")
        router.push("/login");
      });
    } catch (error) {
      console.error(error);
      toast.error("Logout Failed !");
    }
   
  };

  return (
    <>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" className="flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/256/5332/5332306.png"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                SubPay
              </span>
            </Link>
            {authToken === null ? (
              <div className="flex items-center lg:order-2">
                <Link
                  href="/login"
                  className="!text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="focus:ring-4 !text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-slate-800"
                >
                  Get started
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:order-2">
                 {
                  pathname!=="/dashboard" &&  <Link
                  className="!text-white focus:ring-4 font-medium rounded-lg text-sm px-3 py-2.5  hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                }
                {
                <Link
                  className="!text-white focus:ring-4  font-medium rounded-lg text-sm px-3 py-2.5 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
                  href="/subscription"
                
                >
                  Subscription
                </Link>
                }
                {
                  <Link
                  className="!text-white  focus:ring-4  font-medium rounded-lg text-sm px-3 py-2.5 hover:bg-gray-700 focus:outline-none focus:ring-gray-800"
                  href="/payment"
                  
                >
                  Payment
                </Link>
                }
              
                
                <Button
                  className="!text-white focus:ring-4  font-medium rounded-lg text-sm px-6 py-2.5 mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800 !normal-case"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
               
                
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
