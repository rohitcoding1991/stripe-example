"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { SiTicktick } from "react-icons/si";
import { useRouter } from "next/navigation";

export default function PaymentStatus() {
  const router = useRouter();

  return (
    <Box className="bg-white text-[#000] flex flex-col sm:max-w-max max-w-[95%] mx-auto items-center rounded-lg  shadow-xl">
      <Box className="bg-green-600 w-full pt-10 text-white !text-center rounded-t-lg">
        <SiTicktick className="max-w-max md:!text-[90px] !text-[60px] mx-auto mb-5" />

        <Typography variant="h4">Payment Successfull !</Typography>
      </Box>
      <div className="bg-green-600 !w-full">
        <svg
          className="h-24 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            className="text-[#fff] fill-current"
            fillOpacity="0.99"
            d="M0,288L60,245.3C120,203,240,117,360,112C480,107,600,181,720,229.3C840,277,960,299,1080,256C1200,213,1320,107,1380,53.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </div>
      <Box className="text-center p-5 break-after-all">
        <Typography variant="body1" color="textSecondary">
          Thank you for your payment. Your transaction was completed
          successfully.
        </Typography>
        <Box className="mt-5">
          <Button
            variant="outlined"
            color="success"
            onClick={() => router.push("/dashboard")}
          >
            Go To Dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
