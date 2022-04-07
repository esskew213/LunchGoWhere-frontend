import React, { useState } from "react";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Button,
  InputAdornment,
  Box,
  Divider,
  FormLabel,
  Modal,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import apis from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Landing = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handleNewNameChange = (evt) => {
    setName(evt.target.value);
  };
  const handleNewUsernameChange = (evt) => {
    setNewUsername(evt.target.value);
  };
  const handleNewPasswordChange = (evt) => {
    setNewPassword(evt.target.value);
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
  };
  const handleSignUpClick = async (evt) => {
    evt.preventDefault();
    const res = await apis.postSignUp({
      name: name,
      username: newUsername,
      password: newPassword,
    });
    setName("");
    setNewUsername("");
    setNewPassword("");
    if (res) {
      navigate("/home");
    }
  };
  return (
    <React.Fragment>
      <Box>
        <Typography variant="h2">Lunch go where?</Typography>
      </Box>
      <form action="/login" method="post">
        <Box
          sx={{ display: "flex", flexDirection: "column", maxWidth: "200px" }}
        >
          <FormControl variant="standard" required>
            <TextField
              variant="standard"
              size="small"
              label="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </FormControl>
          <FormControl variant="standard" required>
            <TextField
              variant="standard"
              size="small"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </FormControl>
          <Button
            endIcon={<ArrowForwardIosIcon />}
            variant="contained"
            type="submit"
            sx={{ width: "120px", mt: "30px" }}
          >
            LOGIN
          </Button>
        </Box>
      </form>
      <Typography>Don't have an account?</Typography>
      <Button onClick={handleOpen}>Sign up now</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSignUpClick}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Sign Up
            </Typography>
            <FormControl variant="standard" required>
              <TextField
                id="standard-basic"
                label="Name"
                variant="standard"
                value={name}
                onChange={handleNewNameChange}
                required
              />
            </FormControl>
            <br />
            <FormControl variant="standard" required>
              <TextField
                id="standard-basic"
                label="Username"
                type="text"
                variant="standard"
                value={newUsername}
                onChange={handleNewUsernameChange}
                required
              />
            </FormControl>
            <br />
            <FormControl variant="standard" required>
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                variant="standard"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
            </FormControl>
            <br />
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "120px", mt: "30px" }}
            >
              Register Me!
            </Button>
          </Box>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default Landing;
