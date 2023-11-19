import {seekerPayForServiceAPI} from 'apis/escrow.api'

export const seekerPayForService = (data,projectID) => {
    return seekerPayForServiceAPI(data,projectID);
}