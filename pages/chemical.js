import Link from 'next/link';
import { Button, Table} from 'semantic-ui-react';
import {ItemsContainer, ItemsHeader} from '../styles/index.styles'
import axios from 'axios';

const Chemical = ({ items }) => {

    const itemQuantity = (qty) => {
        if (qty <= 0) {
            return 'red'
        }
    }

    return <>
        <ItemsContainer>
        <ItemsHeader>Chemicals</ItemsHeader>
            <Table unstackable celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Stock</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
    
                {items ? items.map(item => {
                    if (item.tag === 'Chemical')
                    return <>
                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Link href={`/${item.id}`}>
                                    <a style={{color: 'red'}}>{item.name}</a>
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
                }): "No Data"}
            </Table>
        </ItemsContainer>
    </>
}

Chemical.getInitialProps = async () => {
    try {
        const res = await axios.get(`https://do-strapi-backend-cnnh6.ondigitalocean.app/products?_limit=500`);
        const items = res.data
        return {items};
    } catch (error) {
        return { error }
    }
}

export default Chemical;