import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {ItemsContainer, CardContainer, DateHeader} from '../styles/index.styles'
import moment from 'moment'
import { Button, Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import {isMobile} from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheckDouble } from '@fortawesome/free-solid-svg-icons'

const Past2 = () => {
    const [orders, setOrders] = useState();

    useEffect(() => { 
        axios({
            "method": "GET",
            "url": "http://localhost:1337/api/orders"
        })
        .then((response) => {
            setOrders(response.data.data)
        })
    }, []);

};

export default Past2;