import PaymentFailed from ".";

export const metadata = {
  title: "SubPay | Payment Failed",
  description: "",
};

const FailedPage = () => {
  return (
    <div className="!w-full !min-h-screen flex justify-center items-center">
      <PaymentFailed />
    </div>
  );
};

export default FailedPage;
