import React, { useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/authValidation";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inuput";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetAuthState } from "../../features/auth/authSlice";
import { loginUser } from "../../features/auth/authThunk";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, isSuccess, error, token, loading } = useSelector(
    (state) => state.auth
  );
  console.log(token, "token");
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("token", token);
      toast.success(successMessage);
      navigate("/");
      dispatch(resetAuthState());
    }
    if (error) {
      toast.error(error);
      console.log(error, "errror");
      dispatch(resetAuthState());
    }
  }, [isSuccess, error, navigate, successMessage, dispatch, token]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-[#EC9600] to-[#FABB05]">
      <div className="rounded-full w-52 h-52 bg-[#EC9610] flex items-center justify-center">
        <img className="w-48 h-20 " src="icon.png" alt="" />
      </div>
      <div className="p-6 rounded-xl w-full max-w-md  mt-5 ">
        <h2 className="text-3xl font-bold md:text-center mb-10 text-gray-800">
          Login
        </h2>

        <form onSubmit={formik.handleSubmit}>
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
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />

          <Button type="submit" className="w-full">
            {loading ? "Loading.." : "Login"}
          </Button>
          <p className="text-center text-sm mt-4 text-white">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-medium cursor-pointer hover:text-blue-800"
            >
              Register Now
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
