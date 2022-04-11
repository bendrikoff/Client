import {$authHost,$host} from "./index";

export const getBlog = async() => {
    const {data} = (await $host.get('/api/blogs?populate=*')).data
    return data
}
export const getOneBlog = async(id) => {
    const {data} = (await $host.get('/api/blogs/'+id+'?populate[blog_comments][populate]=*&populate[cover]=*')).data
    return data
}
export const createBlogComment= async(text,user,blog) => {
    const {data} =await $host.post('/api/blog-comments',{data:{text: text,users_permissions_user:user,blog:blog}})
    return data
}
