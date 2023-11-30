import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authActions";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(5, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();

  const signInForm = async (user) => {
    setLoading(true);
    try {
      const data = await dispatch(login(user));
      if (data.msg === "done") {
        toast.success("Signin successfully");
        setLoading(false);
        timeoutRef.current = setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong !");
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: signInForm,
  });

  return (
    <Container>
      <Grid container>
        <Grid item md={6} sm={12} xs={12} sx={{ mx: "auto", my: "2rem" }}>
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h2" sx={{ my: "1rem", fontWeight: "400" }}>
              Signin
            </Typography>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              {loading ? <LoopIcon /> : "Signin"}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
}
