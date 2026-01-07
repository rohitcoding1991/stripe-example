/* eslint-disable @next/next/no-img-element */
import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";

export default function SignUpPageContent() {
  return (
    <div className="flex justify-center align-center min-h-screen w-full">
      <div className="flex !w-full justify-center">
        <div className="container md:!w-[50%] !w-full md:px-20 px-12 flex flex-col py-5 justify-center items-center">
          <div className="formContianer max-w-xl md:w-full">
            <div className="formHeader">
              <div className="flex text-black dark:text-white items-center font-bold">
              <img
                src="https://cdn-icons-png.flaticon.com/256/5332/5332306.png"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              SubPay
              </div>
              <h2 className="text-2xl leading-9 font-bold mt-8 text-black dark:text-white">
                Sign up for your account
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Already a member?
                <Link href="/login" className="font-semibold text-slate-600 dark:!text-slate-300">
                
                  Log In Here
                </Link>
              </p>
            </div>
            <div className="lowerContent mt-10">
              <div className="formDiv">
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
        <div className="container md:block hidden md:!w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt="formImage"
            className="h-full  max-w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
