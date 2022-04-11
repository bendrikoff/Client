import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {getForum} from "../http/forumApi";
import {getBlog} from "../http/blogApi";

const Blog = () => {
    const [loading,setLoading] = useState(true)

    const {blog} = useContext(Context)

    useEffect(()=>{
        getBlog().then(data=>blog.setBlog(data)).finally(()=>setLoading(false))
    },[])


    if(loading){
        return <Spinner animation="grow"/>
    }

    return (

        <div>
            <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60,margin:50,paddingLeft:150,paddingRight:150,textAlign:"center",marginTop:100}}>Блог</h1>
            <Container className={"d-flex flex-wrap"} >
                {blog._store.map(blogItem=>
                    <a key={blogItem.id} href={"blog/"+blogItem.id} style={{textDecoration:"none",color:'#333333',width:"50%"}} className="hover-zoom">
                        <Container className={"d-flex flex-column" } style={{marginRight:70,marginTop:50}}>
                            <div><Image src={"http://localhost:1337"+blogItem.attributes.cover.data.attributes.url} style={{height:"100%",width:"100%",objectFit:"cover",borderTopRightRadius:30,borderTopLeftRadius:30,boxShadow:"4px -4px 38px 15px rgba(34, 60, 80, 0.12)"}}></Image></div>
                            <div style={{paddingLeft:30,paddingTop:30,boxShadow:"4px 4px 38px 15px rgba(34, 60, 80, 0.12)",borderBottomRightRadius:30,borderBottomLeftRadius:30}} className={"d-flex flex-column"}>
                                <span style={{fontSize:20,fontWeight:"bold",color:'#333333',}}>{blogItem.attributes.title}</span>
                                <span className={"mt-3"} style={{fontSize:20,paddingRight:15}}>{blogItem.attributes.text.slice(0,50)}...</span>
                                <span className={"mt-5"} style={{fontSize:20,paddingRight:15,color:'#989898',paddingBottom:30}}>{blogItem.attributes.publishedAt.slice(0,10)}</span>
                            </div>
                        </Container>
                    </a>
                )}

            </Container>
        </div>
    );
};

export default Blog;