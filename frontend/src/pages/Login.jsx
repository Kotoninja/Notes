import React from 'react'
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
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [visibility, setVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState(false)
    const navigate = useNavigate();


    async function handleFrom(e) {
        e.preventDefault()


        if (password && username) {
            setLoading(true);
            try {
                await api.post("api/token/", { username, password })
                    .then(function (response) {
                        localStorage.setItem(ACCESS_TOKEN, response.data.access);
                        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                        // context?.fetchUser(); NOTE Uncommit this line, when user context was configured
                        navigate("/")
                    })
            } catch (error) {
                setFormError(true)
            } finally {
                setLoading(false);
            }
        } else {
            console.log("Username or password")
        }
    }

    function handleVisibility() {
        setVisibility(!visibility)
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
            <form onSubmit={handleFrom} className="form-container">
                <Box sx={{ display: "flex", justifyContent: "center", }}>
                    <h1>Sign in</h1>
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

                {formError && <Alert sx={{ my: 2 }} severity="error">Incorrect username or password.</Alert>}
                <Button loading={loading} sx={{ width: "100%" }} variant="contained" type="submit">Submit</Button>
                <Box sx={{ my: "10px", display: "flex", justifyContent: "center" }}>Don't have an account? <Link sx={{ml:"4px"}} href="/registration">Sing up</Link></Box>
            </form>
        </Box>
    )
}

export default Login;
