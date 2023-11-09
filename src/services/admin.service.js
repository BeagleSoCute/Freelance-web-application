import { showPostServicePending } from "apis/admin.api";

export const showPendingPostService = async() => {
    const {success, payload} = await showPostServicePending();
    return {success, payload};
};
