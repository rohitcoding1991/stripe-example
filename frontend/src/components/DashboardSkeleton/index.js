import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const DashboardSkeleton = () => {
  return (
    <Box className="w-[90%] mx-auto h-fit bg-white rounded-lg px-4 py-3 mt-10 flex gap-10 lg:flex-row flex-col">
      <Box className="w-full">
        {/* CustomerInfoSection Skeleton */}
        <Box display="flex" justifyContent="space-between" mb={5}>
          <Skeleton variant="rectangular" width={150} height={36} />
          <Skeleton variant="circular" width={50} height={50} />
        </Box>

        {["Display Name", "Phone", "Email"].map((label, index) => (
          <React.Fragment key={index}>
            <Box display="flex" justifyContent="space-between" my={2}>
              <Box className="text-sm">{label}:</Box>
              <Skeleton variant="text" width={100} height={24} />
            </Box>
            {index < 2 && <Divider />}
          </React.Fragment>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* DataTable Skeleton */}
      <Box sx={{ height: 300, width: "100%" }} mt={2}>
        <Skeleton variant="rectangular" width="100%" height={40} />
        {Array.from(new Array(5)).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={40}
            sx={{ mt: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DashboardSkeleton;
