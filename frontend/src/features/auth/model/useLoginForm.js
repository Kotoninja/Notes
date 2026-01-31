import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { api } from "@/shared/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/shared/constants";

export function useLoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false); // TODO move to a LoginForm
    const [formError, setFormError] = useState(false);
    const navigate = useNavigate();
    const context = useContext(UserContext);

    async function handleFrom(e) {
        e.preventDefault();
        if (password && username) {
            setLoading(true);
            try {
                await api.post("api/token/", { username, password })
                    .then(function (response) {
                        localStorage.setItem(ACCESS_TOKEN, response.data.access);
                        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                        context?.fetchUser();
                        navigate("/home");
                    });
            } catch (error) {
                setFormError(true);
            } finally {
                setLoading(false);
            };
        } else {
            console.log("Username or password");
        };
    };

    function handleVisibility() {
        setVisibility(!visibility);
    };
    return { username, setUsername, password, setPassword, visibility, loading, formError, handleFrom, handleVisibility };
};
