import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Image, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {createComment, createForum, getComments, getForum, getOneForum} from "../http/forumApi";
import data from "bootstrap/js/src/dom/data";

const ForumItem = () => {
    const {id} = useParams();
    const [loading,setLoading] = useState(true)
    const {forum} = useContext(Context)
    const [text, setText] = useState('')
    const {user} = useContext(Context)
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
        getOneForum(id).then(data=>forum.setForum(data)).finally(()=>setLoading(false))
    },[])


    const [anyValue,setAnyValue] = useState(null)

    const getF =async()=>{
        await getOneForum(id).then(data=>forum.setForum(data)).finally(setAnyValue(true))
        await setAnyValue(false)
    }

    const SendComment = () =>{
            if (validation()&&user.isAuth) {
                createComment(text, user.userReq, forum._forum).finally(getF)
            }

    }


    if(loading){
        return <Spinner animation="grow"/>
    }


    return (
        <div>
            <Container style={{boxShadow:"4px 4px 38px 15px rgba(34, 60, 80, 0.12)",padding:30,borderRadius:50,paddingLeft:50,paddingRight:50}} className={"mt-5 d-flex flex-row"} >
                <div className={"d-flex flex-column"}>
                    <div  className={"d-flex"} style={{backgroundColor:forum._forum.attributes.users_permissions_user.data.attributes.color,width:100,height:100,borderRadius:20,marginTop:10,marginRight:20}}>
                        <span style={{margin:"auto",fontWeight:"bold",color:"#fff",fontSize:30}}>{forum._forum.attributes.users_permissions_user.data.attributes.username.slice(0,1).toUpperCase()}</span>
                    </div>
                    <span>{forum._forum.attributes.users_permissions_user.data.attributes.username}</span>
                    <p>{forum._forum.attributes.publishedAt.slice(0,10)}</p>
                </div>
                <div  className={"mt-3"}>
                    <h2>{forum._forum.attributes.title}</h2>
                    {forum._forum.attributes.text}
                </div>
            </Container>

            {forum._forum.attributes.forum_messages.data.map(item=>
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



            <Container style={{boxShadow:"4px 4px 38px 15px rgba(34, 60, 80, 0.12)",borderRadius:50}} className={"mt-5 d-flex flex-row"} >
                {user.isAuth ?
                    <Form.Group className="m-5" style={{width: "100%"}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Введите ваш комментарий:</Form.Label>

                        <Form.Control as="textarea" onChange={e => onChangeText(e.target.value)} rows={8}/>
                        {textValidation == '' ?
                            <></>
                            :
                            <div style={{visibility: "visible", color: "red"}}>{textValidation}</div>
                        }
                        <Button variant={"success"} style={{
                            borderRadius: 30,
                            backgroundColor: '#04ddb2',
                            border: "none",
                            fontWeight: "bold",
                            fontSize: 20
                        }} className="mt-5 p-3" onClick={() => SendComment()}>Отправить сообщение</Button>
                    </Form.Group>
                    :
                    <div></div>
                }
            </Container>
        </div>
    );
};

export default ForumItem;