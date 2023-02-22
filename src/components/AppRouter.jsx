import React from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const isAuth = useSelector(state => state.authReducer.isAuth)

    return (
        isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component />}
                    />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component/>}
                    />
                )}
            </Routes>
    );
};

export default AppRouter;
