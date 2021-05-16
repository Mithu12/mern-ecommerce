import React, {useEffect, useState} from 'react';
import {Alert} from "react-bootstrap";

const Message = ({variant, children, flash, timer}) => {


    useEffect(()=> {
        if (flash)
            setTimeout(() => flash(false), (timer*1000));
    },[])


    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
};

Message.defaultProps = {
    variant: 'info',
    timer: 2
}

export default Message;