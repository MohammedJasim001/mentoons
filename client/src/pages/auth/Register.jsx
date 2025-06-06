import React, { useEffect } from "react";
import { useFormik } from "formik";
import { signupSchema } from "../../validation/authValidation";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inuput";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetAuthState } from "../../features/auth/authSlice";
import { registerUser } from "../../features/auth/authThunk";
import { Logo } from "../../components/Logo";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMessage, isSuccess, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(successMessage);
      navigate("/login");
      dispatch(resetAuthState());
    }
    if (error) {
      toast.error(error);
      console.log(error, "errror");
      dispatch(resetAuthState());
    }
  }, [isSuccess, error, navigate, successMessage, dispatch]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log("object");
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="bg-gradient-to-b from-[#EC9600] to-[#FABB05] min-h-screen">
        <Logo />
      <div className="flex flex-col items-center justify-center ">
        <div className="p-6 rounded-xl w-full max-w-md mt-5 md:mt-0">
          <h2 className="text-3xl font-bold md:text-center mb-10 md:mb-5 text-gray-800">
            Sign Up
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <h2 className=" font-bold">UserName</h2>
            <div className="flex gap-3">
              <Input
                name="firstName"
                placeholder="First name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : undefined
                }
              />

              <Input
                name="lastName"
                placeholder="Last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : undefined
                }
              />
            </div>

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : undefined
              }
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />

            <Button type="submit" className=" w-full ">
              {loading ? "Loading.." : "Register"}
            </Button>
            <p className="text-center text-white text-sm mt-4">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 font-medium cursor-pointer hover:text-blue-800"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
