import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/shared/api";

export function useRegistrationForm() {
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
                        navigate("/login");
                    });
            } catch {
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

    return { username, setUsername, password, setPassword, email, setEmail, visibility, loading, formError, handleFrom, handleVisibility };
};
