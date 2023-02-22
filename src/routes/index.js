import {ROUTE_HOME, ROUTE_LOGIN, ROUTE_MEMORY} from "../utils/consts";
import loadable from "@loadable/component";
import LoaderPage from "../components/UI/LoaderPage/LoaderPage";

const HomePage = loadable(() => import("../pages/HomePage"), {
    fallback: <LoaderPage/>
    });
const MemoryPage = loadable(() => import("../pages/MemoryPage"), {
    fallback: <LoaderPage/>
});
const LoginPage = loadable(() => import("../pages/LoginPage"), {
    fallback: <LoaderPage/>
});
const ItemPage = loadable(() => import("../pages/ItemPage"), {
    fallback: <LoaderPage/>
});
const ErrorPage = loadable(() => import("../pages/ErrorPage"), {
    fallback: <LoaderPage/>
});


export const publicRoutes = [
    {path: '/', component: HomePage},
    {path: ROUTE_HOME, component: HomePage},
    {path: ROUTE_LOGIN, component: LoginPage},
    {path: '*', component: ErrorPage},
]

export const privateRoutes = [
    {path: '/', component: HomePage},
    {path: ROUTE_HOME, component: HomePage},
    {path: ROUTE_MEMORY, component: MemoryPage},
    {path: ROUTE_MEMORY + '/:id/:id', component: ItemPage},
    {path: '*', component: ErrorPage},
]