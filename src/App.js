import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Spinner} from "react-bootstrap";

function App() {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            user.setId(data.id)
        }).finally(() => setLoading(false))

    }, [])



    if (loading) {
        return <Spinner animation={"grow"}/>
    }
  return (
    <BrowserRouter>
        <Header/>
     <AppRouter/>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
