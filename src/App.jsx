import { Route, Routes } from "react-router-dom";
import Root from "./components/Root";
import Note from "./components/Note";
import { Box } from "@mui/material";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Notfound from "./components/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/auth/AuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      dispatch(loginUser(storedUser));
    }
  }, [dispatch]);
  return (
    <>
      <Box>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Note />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
