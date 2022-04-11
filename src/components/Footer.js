import React from 'react';
import {Container} from "react-bootstrap";

const Footer = () => {
    return (
        <Container style={{marginTop:150}}>
            <hr></hr>
            <Container style={{width:"100%"}} className={"d-flex flex-row m-5 justify-content-center"}>
                <Container style={{width:"30%"}}>
                    <span style={{fontWeight:"bold"}}>Logo</span>
                    <p className={"mt-4"}>All rights reserved.</p>
                    <p className={"mt-4"}>Агафонов Данил 2021</p>
                </Container>
                <Container style={{width:"30%"}}>
                    <span style={{fontWeight:"bold"}}>О нас</span>
                    <p className={"mt-4"}><a href={"/"} style={{textDecoration:"none",color:"#000"}}>Скачать</a></p>
                    <p className={"mt-4"}><a href={"/help"} style={{textDecoration:"none",color:"#000"}}>Обратная свзять</a></p>
                </Container>
                <Container style={{width:"30%"}}>
                    <span style={{fontWeight:"bold"}}>Важное</span>
                    <p className={"mt-4"}><a href={"/forum"} style={{textDecoration:"none",color:"#000"}}>Форум</a></p>
                    <p className={"mt-4"}><a href={"/blog"} style={{textDecoration:"none",color:"#000"}}>Блог</a></p>
                    <p className={"mt-4"}><a href={"/help"} style={{textDecoration:"none",color:"#000"}}>Помощь</a></p>
                </Container>

            </Container>
        </Container>
    );
};

export default Footer;