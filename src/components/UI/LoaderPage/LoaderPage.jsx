import React from 'react';
import classes from "./LoaderPage.module.css";

const LoaderPage = () => {
    return (
        <div className={classes.loaderPage}>
            <div className={classes.loaderPage__container}>
                <div className={classes.roller}>
                </div>
                <p>Згадуємо<span>.</span><span>.</span><span>.</span></p>
            </div>
        </div>
    );
};

export default LoaderPage;