import SignUpPageContent from ".";

export const metadata = {
    title: "SubPay | Sign-Up Page",
    description: "",
};

export default function SignUpPage() {

    return (
        <div className="!w-full !min-h-[100vh] flex justify-center items-center bg-white dark:bg-gray-900">
            <SignUpPageContent/>
        </div>
    );
  }