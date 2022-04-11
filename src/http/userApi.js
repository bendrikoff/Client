import {$authHost,$host} from "./index";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const registration = async(username,email,password) =>{
    const colors=[
        "#2F80ED",
        "#219653",
        "#EB5757",
        "#F2994A"
    ]
    const {data} = await $host.post('/api/auth/local/register', {username:username,email:email, password:password,color:colors[getRandomInt(4)]})
    console.log(data)
    localStorage.setItem('token',data.jwt)
    return data
}
export const login = async(email,password) =>{
    const {data} = await $host.post('/api/auth/local', {identifier:email, password:password})
    localStorage.setItem('token',data.jwt)
    return data
}
export const check = async() =>{
    const {data} =await $authHost.get('/api/users/me')
    return data
}