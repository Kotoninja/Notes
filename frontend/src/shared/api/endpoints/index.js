export const AUTH = {
    LOGIN: "api/token/",
    REGISTRATION: "api/user/registration/"
};

export const NOTE = {
    ALL: "api/note/all/",
    CREATE: "api/note/create/",
    DELETE: (id) => { `api/note/delete/${id}/` },
    UPDATE: (id) => { `api/note/update/${id}/` }
};