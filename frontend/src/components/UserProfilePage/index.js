"use client";

import { useSelector } from "react-redux";
import CustomerInfoSection from "../ContactInfoSection";
import DataTable from "../DataTable";
import DashboardSkeleton from "../DashboardSkeleton";
import ProductDataTable from "../ProductDataTable";
import Link from "next/link";
import { Button } from "@mui/material";

export default function UserProfilePage({ loading }) {
  const { userData } = useSelector((state) => state.user);
  console.log(userData, "userData");
  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <div className="max-w-[90%] mx-auto min-h-[90vh]">
        <div className="w-full flex flex-col justify-center gap-10">
          <div className="topSection">
            <CustomerInfoSection />
          </div>
          <div className="bottomSection mt-10">
            <h2 className="!text-2xl mb-5">Subscription History</h2>
            {userData?.data?.subscriptionHistory?.length > 0 ? (
              <DataTable data={userData?.data || userData} />
            ) : (
              <>
                <div className="!w-full !h-[400px] !bg-white flex justify-center items-center">
                  <div className="!text-center">
                    <p className="text-lg text-gray-500 mb-5">
                      No subscription history found.
                    </p>
                    <Link href="/subscription">
                      <Button variant="contained" color="primary">
                        Take a new subscription!
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="my-10">
          <h2 className="!text-2xl mb-5">Payment History</h2>
          {userData?.data?.paymentHistory?.length > 0 ? (
            <ProductDataTable data={userData?.data?.paymentHistory} />
          ) : (
            <>
              <div className="!w-full !h-[400px] !bg-white flex justify-center items-center">
                <div className="!text-center">
                  <p className="text-lg text-gray-500 mb-5">
                    No Payment history found.
                  </p>
                  <Link href="/payment">
                    <Button variant="contained" color="primary">
                      Buy Product!
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
