import React from "react"
import { useState } from "react"
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/TextField";
import { noteCreate } from "@/entities/note/api";

export function CreateNote(props) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleForm(event) { // TODO async is needed?
        event.preventDefault();
        if (name) {
            setLoading(true);
            try {
                const response = await noteCreate({ title: name });
                props.addTask(name, response?.data?.id);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            };
        };
    };

    return (
        <>
            <form onSubmit={handleForm}>
                <FormControl fullWidth={true}>
                    <OutlinedInput id="new-todo-input" placeholder={"What needs to be done?"} value={name} onChange={(e) => setName(e.target.value)} />
                    <Button loading={loading} variant="contained" sx={{ my: 2 }} type="submit">Add</Button>
                </FormControl>
            </form>
        </>
    );
};
