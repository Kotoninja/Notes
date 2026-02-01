import React, { useState } from "react";
import { useAuthForm } from "./useAuthForm";
import { registration } from "@/shared/api/auth";

export function useRegistrationForm() {
    const variables = useAuthForm();
    const [email, setEmail] = useState("");

    async function handleForm(e) {
        e.preventDefault();
        if (variables.password && variables.username) {
            variables.setLoading(true);
            try {
                await registration(variables.username, variables.password, email);
                variables.navigate("/login");
            } catch (error) {
                console.log(error);
                variables.setFormError(true);
            } finally {
                variables.setLoading(false);
            }
        } else {
            console.log("Username or password");
        };
    };


    return { ...variables, email, setEmail, handleForm };
};
