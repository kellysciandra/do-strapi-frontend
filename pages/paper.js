import Link from 'next/link';
import { Button, Table} from 'semantic-ui-react';
import {ItemsContainer, ItemsHeader} from '../styles/index.styles'
import axios from 'axios';
import { useEffect, useState } from 'react';

const Paper = () => {
    const [items, setItems] = useState();

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:1337/api/products"
        })
        .then((response) => {
            setItems(response.data.data)
        })
    }, []);

    const itemQuantity = (qty) => {
        if (qty <= 0) {
            return 'red'
        }
    }

    return <>
        <ItemsContainer>
        <ItemsHeader>Paper Products</ItemsHeader>
            <Table unstackable celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Stock</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
    
                {items ? items.map(item => {
                    if (item.attributes.tag === 'Paper')
                    return <>
                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Link legacyBehavior href={`/${item.id}`}>
                                    <a style={{color: 'orange'}}>{item.attributes.name}</a>
                                </Link>
                            </Table.Cell>
                            <Table.Cell style={{backgroundColor: itemQuantity(item.qty)}}>{item.attributes.qty}</Table.Cell>
                            <Table.Cell collapsing textAlign='right'>
                                <Link href={`/${item.id}`}>
                                    <Button primary>View</Button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                        </Table.Body>        
                    </>
                }): "No Data"}
            </Table>
        </ItemsContainer>
    </>
}

export default Paper;
