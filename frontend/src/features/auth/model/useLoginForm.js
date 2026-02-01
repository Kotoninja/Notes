import React from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/shared/constants";
import { useAuthForm } from "./useAuthForm";
import { login } from "@/shared/api/auth";

export function useLoginForm() {
    const variables = useAuthForm();

    async function handleForm(e) {
        e.preventDefault();
        if (variables.password && variables.username) {
            variables.setLoading(true);
            try {
                const responseData = await login(variables?.username, variables?.password)
                localStorage.setItem(ACCESS_TOKEN, responseData.access);
                localStorage.setItem(REFRESH_TOKEN, responseData.refresh);
                variables?.context?.fetchUser();
                variables?.navigate("/home");
            } catch (error) {
                console.log(error)
                variables.setFormError(true);
            } finally {
                variables.setLoading(false);
            };
        } else {
            console.log("Username or password");
        };
    };

    return { ...variables, handleForm };
};
