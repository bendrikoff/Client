import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Image, Spinner} from "react-bootstrap";
import icon from "../assets/info.png"
import {Context} from "../index";
import {createForum, getForum} from "../http/forumApi";


const Forum = () => {

    const {forum} = useContext(Context)
    const {user} = useContext(Context)

    const [loading,setLoading] = useState(true)

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [description, setDesc] = useState('')

    const [textValidation, setTextValidation] = useState('')
    const [titleValidation, setTitleValidation] = useState('')
    const [descValidation, setDescValidation] = useState('')


    useEffect(()=>{
        getForum().then(data=>forum.setForum(data)).finally(()=>setLoading(false))
    },[])




    const validation=()=>{
        if(title=='') {
            setTitleValidation('Поле не может быть пустым')
            return false
        }
        if(text=='') {
            setTextValidation('Поле не может быть пустым')
            return false
        }
        if(description=='') {
            setDescValidation('Поле не может быть пустым')
            return false
        }
        return true
    }
    const onChangeTitle=(text)=>{
        setTitle(text)
        setTitleValidation('')
    }

    const onChangeText=(text)=>{
        setText(text)
        setTextValidation('')
    }

    const onChangeDesc=(text)=>{
        setDesc(text)
        setDescValidation('')
    }


    const [anyValue,setAnyValue] = useState(null)

    const getF =async()=>{
       await getForum().then(data=>forum.setForum(data)).then(setAnyValue(true))
       await setAnyValue(false)
    }

    const SendTopic = () =>{
        if (validation()&&user.isAuth) {
            createForum(title,description,text,user.userReq).catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            }).finally(getF)

        }

    }


    if(loading){
        return <Spinner animation="grow"/>
    }
    return (
        <div>
            <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60,margin:50,paddingLeft:150,paddingRight:150,textAlign:"center",marginTop:100}}>Форум</h1>

            {forum._forum.map(forumItem=>
                <a key={forumItem.id} href={"/forum/"+forumItem.id} style={{textDecoration:"none",color:"#333333"}} >
                    <Container style={{boxShadow:"4px 4px 38px 15px rgba(34, 60, 80, 0.12)",padding:30,borderRadius:50}} className={"mt-5 hover-zoom d-flex flex-row"} >
                        <Image src={icon} style={{maxWidth:50,maxHeight:50,marginTop:15,marginRight:30}}></Image>
                        <div>
                            <h2>{forumItem.attributes.title}</h2>
                            {forumItem.attributes.description}
                        </div>
                    </Container>
                </a>
            )}


            {user.isAuth ?
                <Container style={{boxShadow:"4px 4px 38px 15px rgba(34, 60, 80, 0.12)",padding:30,borderRadius:50}} className={"mt-5 d-flex flex-row"} >
                    <Form.Group className="m-5" style={{width:"100%"}} controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Название темы:</Form.Label>
                        <Form.Control onChange={e=>onChangeTitle(e.target.value)} />
                        {titleValidation==''?
                            <></>
                            :
                            <div style={{visibility:"visible",color:"red"}}>{titleValidation}</div>
                        }
                        <Form.Label>Описание темы:</Form.Label>
                        <Form.Control  onChange={e=>onChangeDesc(e.target.value)}/>
                        {descValidation==''?
                            <></>
                            :
                            <div style={{visibility:"visible",color:"red"}}>{descValidation}</div>
                        }
                        <Form.Label>Введите текст:</Form.Label>
                        <Form.Control as="textarea" rows={8}  onChange={e=>onChangeText(e.target.value)}/>
                        {textValidation==''?
                            <></>
                            :
                            <div style={{visibility:"visible",color:"red"}}>{textValidation}</div>
                        }
                        <Button variant={"success"} style={{borderRadius: 30,backgroundColor:'#04ddb2',border:"none",fontWeight:"bold",fontSize:20}} className="mt-5 p-3" onClick={SendTopic}>Создать тему</Button>
                    </Form.Group>
                </Container>                :
                <div></div>

            }




        </div>
    );
};

export default Forum;