import React from 'react';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";
import Link from '@mui/material/Link';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import api from "../api";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';

function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(false);
    const navigate = useNavigate();


    async function handleFrom(e) {
        e.preventDefault();

        if (password && username) {
            setLoading(true);
            try {
                await api.post("api/user/registration/", { username, password, email })
                    .then(function (response) {
                        navigate("/home");
                    });
            } catch (error) {
                setFormError(true);
            } finally {
                setLoading(false);
            }
        } else {
            console.log("Username or password");
        };
    };

    function handleVisibility() {
        setVisibility(!visibility);
    };

    return (
        <>
            <title>Registration</title>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
                <form onSubmit={handleFrom} className="form-container">
                    <Box sx={{ display: "flex", justifyContent: "center", }}>
                        <h1>Sign up</h1>
                    </Box>
                    <Box sx={{ height: "100%", gap: 1, mb: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <FormControl>
                            <TextField
                                id="outlined-error-helper-text"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={formError}
                                required
                            />
                        </FormControl>

                        <FormControl>
                            <TextField
                                type="email"
                                name="email"
                                id="input-email"
                                label="Email"
                                className="form-input"
                                aria-describedby="my-helper-text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={formError}
                                sx={{ width: "100%" }}
                                required
                            />
                        </FormControl>

                        <FormControl>
                            <Box sx={{ position: "relative", display: "inline-block" }}>
                                <TextField
                                    type={visibility ? "text" : "password"}
                                    name="password"
                                    id="input-password"
                                    label="Password"
                                    className="form-input"
                                    aria-describedby="my-helper-text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={formError}
                                    sx={{ width: "100%" }}
                                    required
                                />
                                {password && <Button size="small" sx={{ position: "absolute", p: 0, minWidth: 0, color: "grey", top: "50%", right: "-25px", transform: "translateY(-50%)" }} onClick={handleVisibility}>
                                    {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </Button>}
                            </Box>
                        </FormControl>
                    </Box>

                    {formError && <Alert sx={{ my: 2 }} severity="error">Oops, something went wrong. Please try again later</Alert>}
                    <Button loading={loading} sx={{ width: "100%" }} variant="contained" type="submit">Submit</Button>
                    <Typography sx={{ my: "10px", display: "flex", justifyContent: "center" }}>Already have an account? <Link sx={{ ml: "4px" }} href="/login">Sign in</Link></Typography>
                </form>
            </Box>
        </>
    );
};

export default Registration;
