import { api, request } from "@/shared/api";
import { NOTE } from "@/shared/api/endpoints";

export function fetchNotes() {
    return request(api.get(NOTE.ALL));
};

export function noteCreate(data) {
    return request(api.post(NOTE.CREATE, data));
};

export function noteUpdate(id, data) {
    return request(api.update(NOTE.UPDATE(id), data));
};

export function noteDelete(id) {
    return request(api.delete(NOTE.DELETE(id)));
};