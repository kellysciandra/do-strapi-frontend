import Link from 'next/link';
import { Button, Table } from 'semantic-ui-react';
import {ItemsContainer, ItemsHeader} from '../styles/index.styles'

const Index = ({ products }) => {

    const itemTag = (tag) => {
        if (tag === 'Paper') {
            return 'red'
        } else if (tag === 'Food') {
            return 'blue'
        } else if (tag === 'Liquor') {
            return 'green'
        } else if (tag === 'Wine' || tag === 'Beer') {
            return 'gray'
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

Index.getInitialProps = async ctx => {
    try {
        const res = await fetch('https://whale-app-v7zkn.ondigitalocean.app/products?_limit=500');
        const data = await res.json();
        return { products: data }
    }catch (error) {
        return (error)
    }
}

export default Index;