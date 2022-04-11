import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import HelpStore from "./store/HelpStore";
import BlogStore from "./store/BlogStore";
import ForumStore from "./store/ForumStore";


export const Context = createContext(null)

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            help: new HelpStore(),
            blog: new BlogStore(),
            forum: new ForumStore()
        }}>
            <App />
        </Context.Provider>

    </React.StrictMode>,
    document.getElementById('root')
);



