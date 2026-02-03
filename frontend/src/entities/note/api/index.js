import { api, request } from "@/shared/api";
import { NOTE } from "@/shared/api/endpoints";

export const noteAPI = {
    getALL: () => request(() => api.get(NOTE.ALL)),
    create: (data) => request(() => api.post(NOTE.CREATE, data)),
    update: (id, data) => request(() => api.put(NOTE.UPDATE(id), data)),
    delete: (id) => request(() => api.delete(NOTE.DELETE(id)))
};
