import React, {useContext} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../Routes";
import {Context} from "../index";

const AppRouter = () => {

    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth &&authRoutes.map(({path,Component})=>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path,Component})=>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={"/"}></Redirect>
        </Switch>
    );
};

export default AppRouter;