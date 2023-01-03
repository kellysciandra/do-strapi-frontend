import Link from 'next/link';
import { Button, Table} from 'semantic-ui-react';
import {ItemsContainer, ItemsHeader} from '../styles/index.styles'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Food = () => {
    const [items, setItems] = useState();

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "http://localhost:1337/products"
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
        <ItemsHeader>Food</ItemsHeader>
            <Table unstackable celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
    
                {items ? items.map(item => {
                    if (item.attributes.tag === 'Food')
                    return <>
                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Link legacyBehavior href={`/${item.id}`}>
                                    <a style={{color: 'blue'}}>{item.attributes.name}</a>
                                </Link>
                            </Table.Cell>
                            <Table.Cell style={{backgroundColor: itemQuantity(item.attributes.qty)}}>{item.attributes.qty}</Table.Cell>
                            <Table.Cell collapsing textAlign='right'>
                                <Link href={`/${item.id}`}>
                                    <Button primary>View</Button>
                                </Link>
                                <Link href={`/${item.id}/edit`}>
                                    <Button color="orange">Edit</Button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                        </Table.Body>        
                    </>
                }): "No Data Available"}
            </Table>
        </ItemsContainer>
    </>
}

export default Food;