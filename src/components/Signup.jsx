import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  age: yup
    .number("Enter your age")
    .required("age is required")
    .min(16, "too small")
    .max(95, "very big"),
  phone: yup
    .string()
    .matches(/^01[0-9]{9}$/, "Phone not valid")
    .required("Phone is required"),
});

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const signUpForm = async (values) => {
    setLoading(true);
    const { data } = await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .catch((err) => {
        setLoading(false);
        toast.error("Something went wrong !");
      });

    if (data.msg === "done") {
      toast.success("Account has created successfully");
      setLoading(false);
      timeoutRef.current = setTimeout(() => {
        navigate("/signin");
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current); // Clear the timeout when the component unmounts
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: 0,
    },
    validationSchema: validationSchema,
    onSubmit: signUpForm,
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
              Register
            </Typography>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
            <TextField
              fullWidth
              id="age"
              name="age"
              label="Age"
              type="text"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              type="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              {loading ? <LoopIcon /> : "Signup"}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
}

