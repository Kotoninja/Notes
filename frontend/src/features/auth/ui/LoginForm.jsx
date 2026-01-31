import React from "react";
import { useLoginForm } from "../model";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";
import Link from '@mui/material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from "@mui/material/Box";

export function LoginForm() {
    const { username, setUsername, password, setPassword, visibility, loading, formError, handleFrom, handleVisibility } = useLoginForm();
    
    return (
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
            <Box sx={{ my: "10px", display: "flex", justifyContent: "center" }}>Don't have an account? <Link sx={{ ml: "4px" }} href="/registration">Sing up</Link></Box>
        </form>
    );
};
