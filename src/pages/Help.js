import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Modal, Spinner} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {Context} from "../index";
import {getHelp} from "../http/helpApi";
import {createHelp} from "../http/contactApi";

const Help = () => {
    const [show, setShow] = useState(false);
    const {help} = useContext(Context)
    const {id} = useParams();
    const {user} = useContext(Context)
    const [loading,setLoading] = useState(true)

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
        getHelp().then(data=>help.setStore(data)).finally(()=>setLoading(false))
    },[])


    const handleClose = () => setShow(false);

    const handleShow =()=>
    {
        if(user.isAuth) {
            setShow(true)
        }

    }

    const history = useHistory()


    const SendComment = () =>{
        if (validation()&&user.isAuth) {
            createHelp(text, user.userReq).then(handleShow)
            setText('')
        }

    }

    if(loading){
        return <Spinner animation="grow"/>
    }
    return (
        <div className={"d-flex flex-column"}>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Добавить ответ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Сообщение отправлено, ответ придет вам на email</Form.Label>
                        </Form.Group>
                        <Button variant="primary" onClick={handleClose} style={{backgroundColor:'#04ddb2',border:"none"}}>Ок</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60,margin:50,paddingLeft:150,paddingRight:150,textAlign:"center",marginTop:100}}>Помощь</h1>
             <Container className={"d-flex flex-row"}>
                 <div style={{width:"20%",marginLeft:50,marginTop:50}}>
                     {help.store.map(helpItem=>
                         <div key={helpItem.id}>
                             {id==helpItem.id?
                                 <div onClick={()=> history.push("/help/"+helpItem.id)} className={"p-2 mb-3"}  style={{backgroundColor:"#3be0b5",fontWeight:"bold",color:"white",borderRadius:15,cursor:"pointer"}}>
                                     <span style={{paddingLeft:15,marginRight:15,whiteSpace:"nowrap"}}>{helpItem.attributes.title}</span>
                                 </div>:
                                 <div onClick={()=> history.push("/help/"+helpItem.id)} className={"p-2 mb-3"} style={{fontWeight:"bold",borderRadius:15,cursor:"pointer",width:1000}}>
                                     <span style={{paddingLeft:15,whiteSpace:"nowrap"}}>{helpItem.attributes.title}</span>
                                 </div>
                             }
                         </div>
                     )}
                 </div>
                 <div style={{marginTop:70,marginLeft:50}}>
                     <h2>{help.store[id-1].attributes.title}</h2>
                     {help.store[id-1].attributes.description}
                 </div>
             </Container>

            {user.isAuth ?
            <Container>
                <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60,margin:50,paddingLeft:150,paddingRight:150,textAlign:"center",marginTop:100}}>Обратная связь</h1>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Введите ваше сообщение:</Form.Label>
                    <Form.Control as="textarea" onChange={e => onChangeText(e.target.value)} rows={8} />

                    {textValidation == '' ?
                        <></>
                        :
                        <div style={{visibility: "visible", color: "red"}}>{textValidation}</div>
                    }

                    <Button variant={"success"} style={{borderRadius: 30,backgroundColor:'#04ddb2',border:"none",fontWeight:"bold",fontSize:20}} className="mt-5 p-3" onClick={SendComment}>Отправить сообщение</Button>
                </Form.Group>
            </Container>:
                <div></div>
            }
        </div>
    );
};

export default Help;