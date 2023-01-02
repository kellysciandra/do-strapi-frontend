import Link from 'next/link';
import React, { useEffect } from 'react'
import EditOrder from '../components/EditOrder';
import { Button, Table, Popup } from 'semantic-ui-react';
import { ItemsHeader, ItemsContainer } from '../styles/index.styles'
import { useState } from 'react';
import { useRouter } from 'next/router';
import {isMobile} from 'react-device-detect';
import axios from 'axios';


const Order = () => {
    const [currentItem, setCurrentItem] = useState({});
    const [products, setProducts] = useState();
    const [currentOrder, setCurrentOrder] = useState([]);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isMobile) {
            window.scrollTo({ top: 450, behavior: 'smooth' })
        }
    }, []);

    useEffect(() => { 
        axios({
            "method": "GET",
            "url": "http://localhost:1337/api/products"
        })
        .then((response) => {
            setProducts(response.data.data)
        })
    }, []);

    const updateModal = (x) => {
        setOpen(x)
    };

    const updateCurrentOrder = (x) => {
        setCurrentOrder(oldOrder => [...oldOrder, x]);
    }

    const handleOpen = (item) => {
        setCurrentItem(item)
        setOpen(true)
    }

    const itemTag = (tag) => {
        if (tag === 'Paper') {
            return 'red'
        } else if (tag === 'Food') {
            return 'blue'
        } else if (tag === 'Liquor') {
            return 'green'
        } else if (tag === 'Chemical') {
            return 'purple'
        } else if (tag === 'Coke') {
            return 'orange'
        } else if (tag === 'TShirt') {
            return 'pink'
        }
    };

    const itemQuantity = (qty) => {
        if (qty <= 0) {
            return 'red'
        }
    }
 
    return <>
        <ItemsContainer>
            <ItemsHeader>Place an order</ItemsHeader>
                <Table unstackable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Stock</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
        
                    {products ? products.map(item => {
                        return <>          
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Link href={`/${item.id}`}>
                                        <a style={{color: itemTag(item.tag)}}>{item.attributes.name}</a>
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell style={{backgroundColor: itemQuantity(item.qty)}}>{item.attributes.qty}</Table.Cell>
                                    <Table.Cell collapsing>

                                            <Popup
                                                trigger={ <Button color='purple' onClick={() => handleOpen(item)}>Add</Button> }
                                                on='click'
                                                onClose={false}
                                                // onOpen={() => setOpen(true)}
                                                position='top right'
                                                content={<EditOrder item={currentItem} handleModal={updateModal} name={item.attributes.name} updateOrder={updateCurrentOrder} productID={currentItem.id}/>}
                                            >
                                            </Popup>
                                    </Table.Cell>
                                </Table.Row>      
                            </Table.Body>
                        </>
                    }): 'No Products in Order'}
                </Table>
        </ItemsContainer>
  </>
}

export default Order;