"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  useTheme,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { BiCheck } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  buySubsciption,
  getProductsList,
  updateSubsciption,
} from "@/store/slices/paymentSlice";
import Loader from "../Loader";
import PricingSkeleton from "../PricingPageSkeleton";

const StyledCard = styled(Card)(({ theme, isPopular }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out",
  position: "relative",
  border: isPopular ? `2px solid ${theme.palette.primary.main}` : "none",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[4],
  },
}));

const PricingPage = ({ from }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const { plans } = useSelector((state) => state.payment);
  const [planLoading, setPlanLoading] = useState(false);
  console.log(userData,"userData");
  
  useEffect(() => {
    setPlanLoading(true);
    dispatch(getProductsList())
      .unwrap()
      .then(() => {
        setPlanLoading(false);
      });
  }, [dispatch]);

  const handlePlan = async (data) => {
    if (!userData?.data?.messageForNull) {
      setOpen(true);
      setLoading(true);
      await dispatch(updateSubsciption())
        .unwrap()
        .then((res) => {
          setLoading(false);
          router.push(res.data);
        });
    } else {
      setOpen(true);
      setLoading(true);
      const productId = data.productId;
      dispatch(buySubsciption(productId))
        .unwrap()
        .then((res) => {
          setLoading(false);
          router.push(res.data);
          setOpen(false);
        })
        .catch((err) => {
          setOpen(false);
          setLoading(false);
          console.error(err);
        });
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Choose Your Perfect Plan
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Select the best plan that suits your needs
        </Typography>
      </Box>

      {planLoading ? (
        <PricingSkeleton />
      ) : (
        <Grid container spacing={4} alignItems="stretch">
          {plans?.data?.map((plan) => (
            <Grid item xs={12} md={4} key={plan.title}>
              <StyledCard isPopular={plan.isPopular}>
                {plan.isPopular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: -30,
                      transform: "rotate(45deg)",
                      backgroundColor: "primary.main",
                      color: "white",
                      px: 4,
                      py: 0.5,
                    }}
                  >
                    Popular
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="h3"
                    component="p"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    ${plan.price}
                    <Typography
                      component="span"
                      variant="subtitle1"
                      sx={{ color: "text.secondary" }}
                    >
                      /month
                    </Typography>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="subtitle1"
                    sx={{ mb: 3 }}
                  >
                    {plan.description}
                  </Typography>

                  <List>
                    {plan.features.map((feature) => (
                      <ListItem key={feature} sx={{ py: 1 }}>
                        <ListItemIcon>
                          <BiCheck
                            color={theme.palette.primary.main}
                            size={24}
                          />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.isPopular ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    disabled={
                      loading ||
                      userData?.data?.activePlan?.planName === plan.title
                        ? true
                        : false
                    }
                    aria-label={`Choose ${plan.title} plan`}
                    onClick={() => {
                      handlePlan(plan);
                    }}
                  >
                    {userData?.data?.messageForNull
                      ? "Choose Plan"
                      : userData?.data?.activePlan?.planName === plan.title
                      ? "Current Plan"
                      : "Update Plan"}
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Backdrop
        sx={(theme) => ({ color: "#00f", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="#00f" />
      </Backdrop>
    </Container>
  );
};

export default PricingPage;
