import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export function useAuthForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState(false);
    const navigate = useNavigate();
    const context = useContext(UserContext);

    function handleVisibility() {
        setVisibility(!visibility);
    };

    return {
        username,
        password,
        context,
        setUsername,
        setPassword,
        visibility,
        loading,
        setLoading,
        setFormError,
        formError,
        navigate,
        handleVisibility
    };
};
