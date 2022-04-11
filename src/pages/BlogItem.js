import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {Button, Container, Form, Image, Spinner} from "react-bootstrap";
import {createBlogComment, getBlog, getOneBlog} from "../http/blogApi";
import {createComment, getOneForum} from "../http/forumApi";
import data from "bootstrap/js/src/dom/data";

const BlogItem = () => {
    const [loading,setLoading] = useState(true)

    const {blog} = useContext(Context)
    const {id} = useParams();
    const {user} = useContext(Context)

    const [text, setText] = useState('')

    const [textValidation, setTextValidation] = useState('')

    const onChangeText=(text)=>{
        setText(text)
        setTextValidation('')
    }
    const validation=()=>{
        if(text=='') {
            setTextValidation('Поле не может быть пустым')
            return false
        }

        return true
    }



    useEffect(()=>{
        getOneBlog(id).then(data=>blog.setBlog(data)).finally(()=>setLoading(false))
    },[])

    const [anyValue,setAnyValue] = useState(null)

    const getF =async()=>{
        await getOneBlog(id).then(data=>blog.setBlog(data)).finally(setAnyValue(true))
        await setAnyValue(false)
    }

    const SendComment = () =>{
        if (validation()&&user.isAuth) {
            createBlogComment(text, user.userReq, blog._store).finally(getF)
        }
    }


    if(loading){
        return <Spinner animation="grow"/>
    }
    return (
        <div className={"d-flex flex-column m-auto"} style={{width:"50%"}}>
            <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60,margin:50,textAlign:"center",marginTop:100}}>
                {blog._store.attributes.title}
            </h1>
            <span className={"m-auto"} >{blog._store.attributes.publishedAt.slice(0,10)}</span>
            <div className={"mt-5 m-auto"}>
                <Image src={"http://localhost:1337"+blog._store.attributes.cover.data.attributes.url} style={{maxWidth:800, borderRadius:30}}></Image>
            </div>
            <span className={"mt-5"}>
                {blog._store.attributes.text}
            </span>

            {user.isAuth ?
                <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Введите ваш комментарий:</Form.Label>
                    <Form.Control onChange={e => onChangeText(e.target.value)} as="textarea" rows={8}/>
                    {textValidation == '' ?
                        <></>
                        :
                        <div style={{visibility: "visible", color: "red"}}>{textValidation}</div>
                    }
                    <Button onClick={() => SendComment()} variant={"success"} style={{
                        borderRadius: 30,
                        backgroundColor: '#04ddb2',
                        border: "none",
                        fontWeight: "bold",
                        fontSize: 20
                    }} className="mt-5 p-3">Отправить сообщение</Button>
                </Form.Group> :

                <div></div>
            }

            {blog._store.attributes.blog_comments.data.map(item=>
            <Container key={item.id} style={{boxShadow:"4px 4px 38px 15px rgba(34, 60, 80, 0.12)",padding:30,borderRadius:50,paddingLeft:50,paddingRight:50}} className={"mt-5 d-flex flex-row"} >
                <div className={"d-flex flex-column"}>
                    <div  className={"d-flex"} style={{backgroundColor:item.attributes.users_permissions_user.data.attributes.color,width:100,height:100,borderRadius:20,marginTop:10,marginRight:20}}>
                        <span style={{margin:"auto",fontWeight:"bold",color:"#fff",fontSize:30}}>{item.attributes.users_permissions_user.data.attributes.username.slice(0,1).toUpperCase()}</span>
                    </div>
                    <span>{item.attributes.users_permissions_user.data.attributes.username}</span>
                    <p>{item.attributes.publishedAt.slice(0,10)}</p>
                </div>
                <div  className={"mt-3"}>
                    {item.attributes.text}
                </div>
            </Container>
                )}


        </div>

    );
};

export default BlogItem;