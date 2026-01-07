"use client";
import React from "react";
import { Grid, Card, CardContent, Box, Skeleton } from "@mui/material";

const PricingSkeleton = () => {
  const skeletonArray = [1, 2, 3]; // Adjust the array length based on the number of cards you want

  return (
    <Grid container spacing={4}>
      {skeletonArray.map((item) => (
        <Grid item xs={12} md={4} key={item}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Skeleton variant="text" width="60%" height={40} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Skeleton variant="text" width="40%" height={30} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Skeleton variant="text" width="80%" height={20} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={150} />
              </Box>
              <Skeleton variant="rectangular" width="100%" height={40} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PricingSkeleton;
