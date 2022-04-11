import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Image, Spinner} from "react-bootstrap";
import icon from "../assets/info.png";
import avatar1 from "../assets/avatar1.jpg";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";
import {Context} from "../index";
import {getBlog} from "../http/blogApi";

const Main = () => {
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
            <Container className={"d-flex mt-5 p-lg-5"}>
                <Container className={"flex-row p-5"}>
                    <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60}}>Поможет <p style={{color:'#04ddb2',lineHeight:0.5}} >в разговоре</p></h1>
                    <h5 style={{color:'#333333'}} className={"pt-5"}>
                        Приложение переводит сказанное собеседником в текст на экране и озвучивает набранные вручную сообщения.
                    </h5>
                    <Button variant={"success"} style={{borderRadius: 30,backgroundColor:'#04ddb2',border:"none",fontWeight:"bold",fontSize:20}} className="mt-5 p-3">Скачать приложение</Button>
                </Container>
                <Container>
                <div style={{background:`url(https://avatars.mds.yandex.net/get-bunker/61205/bd448203ebd7a215fa547487d61fff0bc9e77d9e/orig) no-repeat center center`,width:500,height:500}} >
                </div>
                </Container>
                <></>
            </Container>
            <div style={{backgroundColor:"#f2f3f5"}}>
                <Container className={"flex-row mt-5 p-lg-5"}>
                    <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60}}>Какая-то очень <p style={{color:'#04ddb2',lineHeight:0.5}}>важная инфа</p></h1>
                    <h5 style={{color:'#333333'}} className={"pt-5"}>
                        Приложение переводит сказанное собеседником в текст на экране и озвучивает набранные вручную сообщения.
                    </h5>
                </Container>
            </div>
            <Container className={"d-flex flex-row justify-content-center p-5"}>
                <Container>
                    <Image src={icon} style={{maxWidth:50,maxHeight:50,marginTop:15,marginRight:30}}></Image>
                    <h2 style={{fontWeight:"bold"}}>Слушает и распознаёт</h2>
                    <span>Всё, что вам говорят, показывается на экране смартфона в виде текста. Чтобы приложение лучше понимало вашего собеседника, просите его говорить медленно и разборчиво и использовать простые фразы!</span>
                </Container>
                <Container className={"m-auto"}>
                    <Image src={icon} style={{maxWidth:50,maxHeight:50,marginTop:15,marginRight:30}}></Image>
                    <h2 style={{fontWeight:"bold"}}>Произносит вслух</h2>
                    <span>Чтобы обратиться к человеку, напечатайте нужные слова, затем попросите приложение произнести их вслух или просто покажите собеседнику. При необходимости сообщение можно развернуть на весь экран.</span>
                </Container>
                <Container className={"m-auto"}>
                    <Image src={icon} style={{maxWidth:50,maxHeight:50,marginTop:15}}></Image>
                    <h2 style={{fontWeight:"bold"}}>Предлагает готовые фразы</h2>
                    <span>В приложении есть и готовые реплики: например, если вам надо начать разговор, занять очередь в магазине или попросить о помощи. Вы также можете добавить в список свои варианты.</span>

                </Container>
            </Container>

            <Container className={"p-5"}>
                <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60}}>Наш <span style={{color:'#04ddb2',lineHeight:0.5}}>блог</span></h1>

                <Container className={"d-flex flex-wrap"} >
                    {blog._store.slice(blog._store.length-4,blog._store.length).map(blogItem=>
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


                    <Button variant={"success"} style={{borderRadius: 30,backgroundColor:'#04ddb2',border:"none",fontWeight:"bold",fontSize:20,margin:"auto"}} className="mt-5 p-3">Читать далее</Button>
                </Container>
            </Container>

            <div style={{backgroundColor:"#f2f3f5",paddingTop:30,paddingBottom:100}} className={"d-flex flex-row"}>
                <Container style={{marginTop:100,paddingTop:30,paddingLeft:20,paddingRight:20,backgroundColor:'#fff',width:'30%',color:'#333333',fontSize:25,borderRadius:50}} className={"d-flex flex-column hover-zoom"}>
                    <Image src={avatar2} style={{maxWidth:70,borderRadius:100}}></Image>
                    <span className={"mt-5"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis id purus in mollis. Donec at varius nibh, nec efficitur risus. Quisque porta sollicitudin sapien, venenatis tristique elit fringilla et.  </span>
                    <span className={"mt-5"} style={{color:'#989898',paddingBottom:30}}>Иван Иванов</span>
                </Container>

                <Container style={{marginTop:100,paddingTop:30,paddingLeft:20,paddingRight:20,backgroundColor:'#fff',width:'30%',color:'#333333',fontSize:25,borderRadius:50}} className={"d-flex flex-column hover-zoom"}>
                    <Image src={avatar1} style={{maxWidth:70,borderRadius:100}}></Image>
                    <span className={"mt-5"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis id purus in mollis. Donec at varius nibh, nec efficitur risus. Quisque porta sollicitudin sapien, venenatis tristique elit fringilla et.  </span>
                    <span className={"mt-5"} style={{color:'#989898',paddingBottom:30}}>Иван Иванов</span>
                </Container>

                <Container style={{marginTop:100,paddingTop:30,paddingLeft:20,paddingRight:20,backgroundColor:'#fff',width:'30%',color:'#333333',fontSize:25,borderRadius:50}} className={"d-flex flex-column hover-zoom"}>
                    <Image src={avatar3} style={{maxWidth:70,borderRadius:100}}></Image>
                    <span className={"mt-5"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis id purus in mollis. Donec at varius nibh, nec efficitur risus. Quisque porta sollicitudin sapien, venenatis tristique elit fringilla et.  </span>
                    <span className={"mt-5"} style={{color:'#989898',paddingBottom:30}}>Иван Иванов</span>
                </Container>

            </div>

            <Container className={"d-flex flex-column mt-5"} style={{width:"100%"}}>
                <h1 style={{color:'#333333',fontWeight:"bold",fontSize:60,margin:50,paddingLeft:150,paddingRight:150,textAlign:"center",marginTop:100}}>Попробуйте сейчас наше приложение</h1>
                <div style={{margin:"auto"}}>
                    <Button variant={"success"} style={{borderRadius: 30,backgroundColor:'#04ddb2',border:"none",fontWeight:"bold",fontSize:20}} className="mt-5 p-3">Скачать приложение</Button>
                </div>

            </Container>
        </div>
    );
};

export default Main;