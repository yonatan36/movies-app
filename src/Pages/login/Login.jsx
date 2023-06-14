import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { LoginArray } from "./ArrayLogin";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { feildValidation } from "../../validation/feildValidation";
import { useNavigate } from "react-router-dom";
import useLoggedIn from "../../hooks/useLoggedIn";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const Login = ({ openLogin, setOpenLogin }) => {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [fieldToFocus, setFieldToFocus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: fieldValue }));
    const fieldSchema = LoginArray.find((field) => field.name === name)?.joi;
    if (fieldSchema) {
      const error = feildValidation(fieldSchema, fieldValue, name);
      setFormError((prevFormError) => ({ ...prevFormError, [name]: error }));
    }
  };

  const getUserInfo = async () => {
    const { data } = await axios.get("/users/userInfo");
    return data.name.firstName;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formError) {
        console.log("error");
        return;
      }
      setIsLoading(true);
      const { data } = await axios.post("/users/login", formData);
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      loggedIn();
      console.log(formData);
      navigate(ROUTES.HOME);
      const firstName = await getUserInfo();
      toast.success(`Welcome ${firstName}! Good to see you`);
      handleClose(true);
    } catch (err) {
      setIsLoading(false);
      toast.error(`invalid email and/or password`);
      console.log(err);
    }
  };

  const handleFocus = (event) => {
    setFieldToFocus(
      LoginArray.findIndex((field) => field.name === event.target.name)
    );
  };

  const resetForm = () => {
    setFormData({});
    setFormError({});
  };
  const handleClose = () => setOpenLogin(false);

  return (
    <React.Fragment>
      <Dialog open={openLogin} onClose={handleClose}>
        <DialogContent>
          <Container maxWidth="xs">
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <HowToRegIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  {LoginArray.map((field, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={field.sm}
                      key={`${new Date()}-${field.id}`}
                    >
                      <TextField
                        fullWidth
                        label={field.label}
                        name={field.name}
                        id={field.id}
                        type={field.type}
                        required={field.required}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        autoFocus={index === fieldToFocus}
                      />
                      <Typography color="red" fontSize="8pt">
                        {formError[field.name] || ""}
                      </Typography>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 4 }}
                      color="error"
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      onClick={resetForm}
                      color="error"
                    >
                      <RestartAltIcon /> Reset Form
                    </Button>
                  </Grid>
                </Grid>
                {/* Cancel button and Link to login page */}
              </Box>
            </Box>
                
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Login;
