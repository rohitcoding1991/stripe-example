"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { BiError } from "react-icons/bi";

const PaymentFailed = () => {
  const router = useRouter();

  return (
    <Box className="bg-white text-[#000] flex flex-col sm:max-w-max max-w-[95%] mx-auto items-center rounded-lg shadow-xl ">
      <Box className="bg-red-600 w-full pt-10 text-white text-center rounded-t-lg">
      <BiError className="max-w-max md:!text-[90px] !text-[60px] mx-auto mb-5" />

        <Typography variant="h4">Payment Failed !</Typography>
      </Box>
      <div className="bg-red-600 !w-full">
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
          We apologize, but your payment could not be processed.
        </Typography>
        <Box className="mt-5">
          <Button
            variant="outlined"
            color="error"
            onClick={() => router.push("/dashboard")}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentFailed;
