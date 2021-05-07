import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {ItemsContainer, ItemsHeader, CardContainer, DateHeader} from '../styles/index.styles'
import moment from 'moment'
import { Button, Card, Modal } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

const Past = ({ orders }) => {
    const [targetItem, setTargetItem] = useState();
    const today = new Date();
    const todaysDate = () => convertDate(today)
    const router = useRouter();


    useEffect(() => {
        targetItem ? 
        axios({
            "method": "PUT",
            "url": `http://localhost:1337/products/${targetItem.id}`,
            "data": {
                qty: targetItem.product.qty - targetItem.qty
            }
        })
        .then((response) => {
            console.log(response)
            handleDelete(targetItem.id)
        }) : null
    }, [targetItem])

    const convertToDate = (stringFromData, short) => {
        const splitTime = stringFromData.split("T");
        const dateArray = splitTime[0].split("-");
        const timeArray = splitTime[1].split(':');
    
        const year = dateArray[0];
        const month = parseInt(dateArray[1]);
        const day = dateArray[2];
    
        const hour = timeArray[0];
        const minute = timeArray[1];
        const second = timeArray[2].split("Z")[0];
    
        if (short) {
            const finalMonth = month < 10 ? `0${month}` : month;
            const dateString = finalMonth + "/" + day + "/" + year;
            return dateString;
        } else {
            const dateObj = new Date(Date.UTC(year, month, day, hour, minute, second, 0));
            return dateObj;
        }
    };

    const convertDate = (date) => {
        var momentDate = moment(date).format('L');
        return momentDate;
    };

    const handleDelete = async (id) => {
        const deleteX = await axios({
            "method": "DELETE",
            "url": `https://do-strapi-backend-cnnh6.ondigitalocean.app/orders/${id}`
        })
        .then((response) => {
            console.log(response)
        })

        deleteX
        router.push("/past");
    };

    const handleSuccess = async (x) => {
        const run = await axios({
            "method": "PUT",
            "url": `https://do-strapi-backend-cnnh6.ondigitalocean.app/products/${x.product.id}`,
            "data": {
                qty: x.product.qty - x.qty
            }
        })
        .then((response) => {
            console.log(response)
        })
        run
        handleDelete(x.id)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return <>
        <ItemsContainer>
            <DateHeader>{todaysDate()}</DateHeader>
                {
                    orders ? orders.map((x) => {
                        const lastNightsOrder = convertToDate(x.date, true)
                        const todaysDate = convertDate(today)
                        
                        if (lastNightsOrder === todaysDate) {
                            return <>
                            <CardContainer>
                                <Card.Group>
                                    <Card style={{alignItems: 'center'}}>
                                        <Card.Content extra description={`${x.name} - ${x.qty}`}/>
                                        <Card.Content extra>
                                                <Button 
                                                    size="tiny" 
                                                    color="red"
                                                    onClick={() => handleDelete(x.id)}
                                                ><FontAwesomeIcon  icon={faTrash}/></Button>
                                                <Button 
                                                    size="tiny" 
                                                    color="green"
                                                    onClick={() => handleSuccess(x)}
                                                ><FontAwesomeIcon icon={faCheckSquare}/></Button> 
                                        </Card.Content>
                                    </Card>
                                </Card.Group> 
                            </CardContainer>        
                            </>
                        }
                    }): null
                }
        </ItemsContainer>
    </>
};

Past.getInitialProps = async (ctx) => {
    const res = await fetch('https://do-strapi-backend-cnnh6.ondigitalocean.app/orders?_limit=500');
    const data = await res.json();
    console.log(data)
    return { orders: data }
}

export default Past;
