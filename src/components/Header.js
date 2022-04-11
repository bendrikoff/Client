import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const Header = () => {
    const {user} = useContext(Context)
    const history = useHistory()


    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token',null)
        window.location.reload()
    }

    return (
        <Navbar bg="white" variant="light">
            <Container className="me-auto">
                <a href={"/"} style={{textDecoration:"none"}}><Navbar.Brand className="just">Logo</Navbar.Brand></a>
                <Nav.Link onClick={()=> history.push("/blog")} style={{color:"#818181"}} >Блог</Nav.Link>
                <Nav.Link onClick={()=> history.push("/forum")} style={{color:"#818181"}}  >Форум</Nav.Link>
                <Nav.Link onClick={()=> history.push("/help/1")} style={{color:"#818181"}}  >Помощь</Nav.Link>

                {user.isAuth ?
                    <Button variant={"success"} onClick={()=>logOut()} className="ml-4" style={{paddingLeft:20,paddingRight:20,color:"black",borderRadius: 20,backgroundColor:'#eef0f2',border:"none"}}>Выйти</Button>
                    :
                    <Button variant={"success"} onClick={()=>history.push(LOGIN_ROUTE)}  className="ml-4" style={{paddingLeft:20,paddingRight:20,color:"black",borderRadius: 20,backgroundColor:'#eef0f2',border:"none"}}>Авторизация</Button>
                }

            </Container>
        </Navbar>
    );
};

export default Header;