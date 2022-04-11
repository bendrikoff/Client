import {$authHost,$host} from "./index";

export const getHelp = async() => {
    const {data} = (await $host.get('/api/helps?populate=*')).data
    return data
}



