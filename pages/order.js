import Link from 'next/link';
import React, { useEffect } from 'react'
import fetch from 'isomorphic-unfetch';
import EditOrder from './[id]/edit_order';
import { Button, Modal,Table} from 'semantic-ui-react';
import { ItemsHeader, ItemsContainer } from '../styles/index.styles'
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const Order = () => {
    const [currentItem, setCurrentItem] = useState({});
    const [currentOrder, setCurrentOrder] = useState([]);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [products, setProducts] = useState();

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "https://do-strapi-backend-cnnh6.ondigitalocean.app/products"
        })
        .then((response) => {
            setProducts(response.data)
        })
    }, []);

    const updateModal = (x) => {
        setOpen(x)
    };

    const updateCurrentOrder = (x) => {
        setCurrentOrder(oldOrder => [...oldOrder, x]);
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     submitOrder();
    // }

    // const submitOrder = async (id) => {

    //     try {
    //         const res = await fetch('http://localhost:3000/api/orders', {
    //             method: 'POST',
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(currentOrder),
    //             data: {
    //                 product: id
    //             }
    //         })
    //         router.push("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
 
    return <>
 
        <ItemsContainer>
            <ItemsHeader>Place an order</ItemsHeader>
                <Table unstackable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Total Available</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
        
                    {products ? products.map(item => {
                    const {id, name, qty, totalOrdered} = item
                        return <>          
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Link href={`/${id}`}>
                                            <a>{name}</a>
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{qty}</Table.Cell>
                                    <Table.Cell collapsing>
                                        <Modal
                                            basic
                                            onClose={() => setOpen(false)}
                                            onOpen={() => setOpen(true)}
                                            closeOnDimmerClick={false}
                                            open={open}
                                            size='small'
                                            trigger={ <Button color='purple' onClick={() => setCurrentItem(item)}>Add</Button> }
                                        >
                                            <Modal.Content>
                                                <EditOrder item={currentItem} handleModal={updateModal} name={currentItem.name} updateOrder={updateCurrentOrder} productID={currentItem.id}/>
                                            </Modal.Content>
                                        </Modal>
                                    </Table.Cell>
                                </Table.Row>      
                            </Table.Body>
                        </>
                    }): null}
                </Table>
            {/* <ListContainer>
                <ListTitle>Current Order</ListTitle>  
                
                    <CurrentOrderContainer>
                        {products ? products.map(item => {

                        if (item.totalOrdered) {
                            return <>
                        <Card.Group>
                            <Card style={{alignItems: 'center'}}>
                                <Card.Content extra description={ `${item.product} - ${item.totalOrdered}`}/>
                            </Card>
                        </Card.Group>
                        </>
                        }}): null}
                    </CurrentOrderContainer>
                    <CurrentOrderSubmit>
                     
                            <Button onClick={(e) => handleSubmit(e)} size="tiny" color='blue'>Submit</Button> 
                    
                    </CurrentOrderSubmit>  
                    
            </ListContainer> */}

        </ItemsContainer>
  </>
}

export default Order;
