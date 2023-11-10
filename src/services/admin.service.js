import { showPostServicePendingAPI, updatePostServiceStatusAPI } from "apis/admin.api";
import {showPostDetailsAPI} from "apis/service.api"

export const showPendingPostService = async() => {
    const {success, payload} = await showPostServicePendingAPI();
    return {success, payload};
};

export const updatePostStatus = async(data,postID) =>{
    const {success, payload} = await updatePostServiceStatusAPI(data,postID);
    return {success, payload};
};

export const showPostDetails = async(postID) => {
    const {success, payload} = await showPostDetailsAPI(postID);
    return {payload}
}
