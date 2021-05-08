import Link from 'next/link';
import { Button, Table } from 'semantic-ui-react';
import {ItemsContainer, ItemsHeader} from '../styles/index.styles'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Index = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "https://do-strapi-backend-cnnh6.ondigitalocean.app/products?_limit=500"
        })
        .then((response) => {
            setProducts(response.data)
        })
    }, []);

    const itemTag = (tag) => {
        if (tag === 'Paper') {
            return 'red'
        } else if (tag === 'Food') {
            return 'blue'
        } else if (tag === 'Liquor') {
            return 'green'
        }
    };

    const itemQuantity = (qty) => {
        if (qty <= 0) {
            return 'red'
        }
    };

    return <>
        <ItemsContainer>
            <ItemsHeader>Warehouse Inventory</ItemsHeader>
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
                                        <a style={{color: itemTag(item.tag)}}>{item.name}</a>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell style={{backgroundColor: itemQuantity(item.qty)}}>{item.qty}</Table.Cell>
                                <Table.Cell collapsing textAlign='right'>
                                    <Link href={`/${item.id}`}>
                                        <Button primary>View</Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                            </Table.Body>        
                        </>
                        }): 'No Data'}
                </Table>
        </ItemsContainer>
    </>
};

export default Index;