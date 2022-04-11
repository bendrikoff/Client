import {$authHost,$host} from "./index";

export const getForum = async() => {
    const {data} = (await $host.get('/api/forums?populate=*')).data
    return data
}
export const getOneForum = async(id) => {
    const {data} = (await $host.get('/api/forums/'+id+'?populate[forum_messages][populate]=*&populate[users_permissions_user]=*')).data
    return data
}
export const createForum = async(title,description,text,user) => {
    const {data} =await $host.post('/api/forums',{data:{title:title,text: text,users_permissions_user:user,description:description}})
    return data
}
export const getComments = async(topicId) =>{
    const {data} = (await $host.get('/api/forum-topics/'+topicId+'/?populate[forum_comments][populate]=*&populate[user]=*')).data
    return data
}
export const createComment = async(text,user,forum) =>{
    const {data} =await $host.post('/api/forum-messages',{data:{text:text,users_permissions_user:user,forum:forum }})
    return data
}