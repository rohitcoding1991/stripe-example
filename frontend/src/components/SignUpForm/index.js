"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { Button, CircularProgress } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { getPhoneNumberWithDialCode } from "@/utils";
import { useDispatch } from "react-redux";
import { createUser } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Import PhoneNumberUtil from google-libphonenumber
import { PhoneNumberUtil } from "google-libphonenumber";

// Initialize PhoneNumberUtil
const phoneUtil = PhoneNumberUtil.getInstance();

// Function to get the minimum valid phone number length for a given country code
const getMinPhoneNumberLength = (countryCode) => {
  try {
    // Get the metadata for the region
    const regionMetadata = phoneUtil.getMetadataForRegion(countryCode);

    if (regionMetadata) {
      // Get an example number for this region
      const exampleNumber = phoneUtil.getExampleNumber(countryCode);
      // If exampleNumber is not null, return its length
      if (exampleNumber) {
        return exampleNumber.getNationalNumber().toString().length;
      }
    }

    return 0;
  } catch (error) {
    console.error("Error getting phone number metadata:", error);
    return 0;
  }
};

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("in"); // Default country code (India)

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Dynamically validate phone number length based on country
  const schema = yup.object().shape({
    fullName: yup.string().required("Please Provide Your Name"),
    emailId: yup
      .string()
      .required("Email is required !")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Email is Invalid"
      ),
    contactNumber: yup
      .string()
      .required("Phone number is required!")
      .test("phone-length", function (value) {
        const minLength = getMinPhoneNumberLength(countryCode);
        const mobile = getPhoneNumberWithDialCode();
        // Check if the mobile number meets the required length
        if (mobile && mobile.phone.length < minLength) {
          return this.createError({
            message: `Phone number must be of min ${minLength} characters.`,
          });
        }
        return true; // Return true if validation passes
      }),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!")
      .matches(/[a-z]/, "At least one lowercase character!")
      .matches(/[A-Z]/, "At least one uppercase character!")
      .matches(/[\W_]/, "At least 1 special character (@, !, #, etc)!")
      .matches(/[0-9]/, "Must Include One Number"),
    confirmPassword: yup
      .string()
      .required("Password confirmation is required!")
      .oneOf([yup.ref("password"), null], "Passwords must match!"),
  });

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      emailId: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const submitForm = async (data) => {
    setLoading(true);
    const mobile = getPhoneNumberWithDialCode();
    const userData = {
      fullName: data.fullName,
      emailId: data.emailId,
      contactNumber: mobile.phone,
      countryCode: mobile.code,
      password: data.password,
    };

    try {
      await dispatch(createUser(userData))
        .unwrap()
        .then(() => {
          reset();
          setLoading(false);
          toast.success("User Registered Successfully!");
          router.push("/login");
        });
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <form
      className="w-[90%] loginForm flex flex-col gap-5"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="formElement">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => <input {...field} placeholder="Full Name" />}
        />
        <p className="errorPara">{errors.fullName?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="emailId"
          control={control}
          render={({ field }) => <input {...field} placeholder="Email Id" />}
        />
        <p className="errorPara">{errors.emailId?.message}</p>
      </div>
      <div className="formElement">
        <Controller
          name="contactNumber"
          control={control}
          render={({ field }) => {
            return (
              <PhoneInput
                {...field}
                country={countryCode} // Set the default country code here
                placeholder="00000-00000"
                enableSearch={true}
                value={field?.value}
                onChange={(value, data) => {
                  field.onChange(value); // Trigger onChange for form
                  setCountryCode(data.countryCode); // Update countryCode based on user input
                }}
                errorMessage={errors?.contactNumber?.message}
                inputStyle={{
                  padding: "5px 55px",
                  width: "100%",
                  border: "1px solid #535c91",
                  background: "transparent",
                  color: "#9e9d9d",
                }}
              />
            );
          }}
        />
        <p className="errorPara">{errors.contactNumber?.message}</p>
      </div>
      <div className="formElement relative">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
                id="password"
              />
              <span
                className="absolute top-1.5 right-3 text-[#fff] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye-off"
                  >
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                    <path d="m2 2 20 20" />
                  </svg>
                )}
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.password?.message}</p>
      </div>
      <div className="formElement relative">
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                id="confirmPassword"
              />
              <span
                className="absolute top-1.5 right-3  cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="gray"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye-off"
                  >
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                    <path d="m2 2 20 20" />
                  </svg>
                )}
              </span>
            </>
          )}
        />
        <p className="errorPara">{errors.confirmPassword?.message}</p>
      </div>

      <p className="text-[#949393d7] mb-4 sm:hidden block">
        Already have a account ?{" "}
        <Link href="/login">
          <span className="text-blue-700"> Login Here </span>
        </Link>{" "}
      </p>

      <div className="formElement max-w-[80px]">
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress color="#fff" size={"20px"} />
          ) : (
            "Register"
          )}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
