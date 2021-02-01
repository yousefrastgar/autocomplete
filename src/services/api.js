import {Api} from "./config";
import {request} from "./request";

export const getAllUsers = async () => {
    return await request.get(Api.Url + "/users");
};
