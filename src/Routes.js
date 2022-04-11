import Main from "./pages/Main";
import {BLOG_ROUTE, FORUM_ROUTE, HELP_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import Blog from "./pages/Blog";
import Forum from "./pages/Forum";
import Help from "./pages/Help";
import Auth from "./pages/Auth";
import BlogItem from "./pages/BlogItem";
import ForumItem from "./pages/ForumItem";

export const authRoutes = []

export const publicRoutes = [
    {
        path:MAIN_ROUTE,
        Component:Main
    },
    {
        path:BLOG_ROUTE,
        Component:Blog
    },
    {
        path:FORUM_ROUTE,
        Component:Forum
    },
    {
        path:HELP_ROUTE+'/:id',
        Component:Help
    },
    {
        path:REGISTRATION_ROUTE,
        Component:Auth
    },
    {
        path:LOGIN_ROUTE,
        Component:Auth
    },
    {
        path:BLOG_ROUTE+'/:id',
        Component:BlogItem
    },
    {
        path:FORUM_ROUTE+'/:id',
        Component:ForumItem
    },
]