"use client";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import React from "react";
import UserAvatar from "../Avatar";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { manageSubscription } from "@/store/slices/paymentSlice";

const CustomerInfoSection = () => {
  const { userData, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleManageSubscription = async () => {
    await dispatch(manageSubscription())
      .unwrap()
      .then((res) => {
        router.push(res.data);
      });
  };

  return (
    <Box className="md:w-[500px]  !h-fit !bg-[white] table-box-shadow border-box rounded-lg !px-4 !py-3 mt-10">
      <div className="flex flex-row-reverse justify-between mb-5">
        <UserAvatar />
        <div className="">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleManageSubscription();
            }}
          >
            Manage Subscription
          </Button>
        </div>
      </div>
      <div className="flex justify-between !my-2">
        <Box className="!text-sm">Display Name:</Box>
        <Box className="!text-sm ">
          {loading ? (
            <Skeleton
              width={70}
              height={30}
              className="!-mt-[5px]"
              animation="wave"
            />
          ) : (
            userData?.data?.fullName || userData?.fullName || "N/A"
          )}
        </Box>
      </div>
      <Divider />
      <div className="flex justify-between !my-2">
        <Box className="!text-sm">Phone:</Box>
        <Box className="Poppins600 !text-sm ">
          {loading ? (
            <Skeleton
              width={70}
              height={30}
              className="!-mt-[5px]"
              animation="wave"
            />
          ) : (
            userData?.data?.contactNumber || userData?.contactNumber || "N/A"
          )}
        </Box>
      </div>
      <Divider />
      <div className="flex justify-between !my-2">
        <Box className="!text-sm">Email:</Box>
        <Box className="!text-sm break-all max-w-[80%]">
          {loading ? (
            <Skeleton
              width={70}
              height={30}
              className="!-mt-[5px]"
              animation="wave"
            />
          ) : (
            userData?.data?.emailId || userData?.emailId || "N/A"
          )}
        </Box>
      </div>
    </Box>
  );
};

export default CustomerInfoSection;
