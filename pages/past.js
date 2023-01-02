import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {ItemsContainer, CardContainer, DateHeader} from '../styles/index.styles'
import moment from 'moment'
import { Button, Card, Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import {isMobile} from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import NumberInputExample from '../components/NumberInput';

const Past = () => {
    const [orders, setOrders] = useState();
    const [adjustedOrderQty, setAdjustedOrderQty] = useState(0);
    const [dataOne, setDataOne] = useState();
    const [dataTwo, setDataTwo] = useState();
    const today = new Date();    
    const todaysDate = () => convertDate(today)

    useEffect(() => { 
        axios({
            "method": "GET",
            "url": "http://localhost:1337/api/orders"
        })
        .then((response) => {
            setOrders(response.data.data)
        })
    }, []);

    useEffect(() => {
        console.log(adjustedOrderQty)
    }, [adjustedOrderQty])

    const convertDate = (date) => {
        var momentDate = moment(date).format('L');
        return momentDate;
    };

    const adjustValue = (x) => {
        setAdjustedOrderQty(x)
    }

    const getDataPointOne = (productID) => {
        axios({
            "method": "GET",
            "url": `http://localhost:1337/api/products/${productID}`
        })
        .then((response) => {
            setDataOne(response.data.data.attributes.qty)
        })
    }

    const getDataPointTwo = (id) => {
        axios({
            "method": "GET",
            "url": `http://localhost:1337/api/orders/${id}`
        })
        .then((response) => {
            setDataTwo(response.data.data.attributes.qty)
        })
    }

    const handleSuccess = (x) => {
        getDataPointOne(x.attributes.productID)
        getDataPointTwo(x.id)
        console.log(dataOne, dataTwo)
        // axios.put(`http://localhost:1337/api/products/${x.attributes.productID}` , 
        // {
        //     "data": {
        //         qty: dataOne - dataTwo
        //     }

        // })
        // .then(response => {
        //     console.log(response)
        // })
    };

    return <>
        <ItemsContainer>
            <DateHeader>{todaysDate()}</DateHeader>
            {
                orders ? orders.map((x) => {
                    return <>
                        <CardContainer>
                            <Card.Group>
                                <Card style={{alignItems: 'center'}}>
                                    <Card.Content extra description={`${x.attributes.name}`}/>
                                    <NumberInputExample startingValue={x.attributes.qty} handleChange={adjustValue} product={x}/>
                                    {/* <Card.Content extra>
                                            <Button 
                                                size="tiny" 
                                                color="red"
                                                onClick={() => handleDelete(x.id)}
                                            ><FontAwesomeIcon icon={faTrash} /></Button>
                                            <Button 
                                                size="tiny" 
                                                color="green"
                                                onClick={() => handleSuccess(x)}
                                            ><FontAwesomeIcon icon={faCheckDouble} /></Button> 
                                    </Card.Content> */}
                                </Card>
                            </Card.Group> 
                        </CardContainer> 
                    </>
                }): "No orders were placed today"
            }
        </ItemsContainer>
    
    </>

};

export default Past;