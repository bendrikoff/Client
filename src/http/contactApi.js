import {$authHost,$host} from "./index";

export const createHelp = async(text,user) => {
    const {data} =await $host.post('/api/contacts',{data:{text: text,users_permissions_user:user}})
    return data
}



