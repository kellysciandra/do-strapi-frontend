import Link from 'next/link';
import { Button, Table} from 'semantic-ui-react';
import {ItemsContainer, ItemsHeader} from '../styles/index.styles'
import axios from 'axios';

const Paper = ({ items }) => {

    return <>
        <ItemsContainer>
        <ItemsHeader>Paper Products</ItemsHeader>
            <Table unstackable celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
    
                {items ? items.map(item => {
                    if (item.tag === 'Paper')
                    return <>
                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Link href={`/${item.id}`}>
                                    <a style={{color: 'red'}}>{item.name}</a>
                                </Link>
                            </Table.Cell>
                            <Table.Cell>{item.qty}</Table.Cell>
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
                }): "No Data"}
            </Table>
        </ItemsContainer>
    </>
}

Paper.getInitialProps = async () => {
    try {
        const res = await axios.get(`https://do-strapi-backend-cnnh6.ondigitalocean.app/products/`);
        const items = res.data
        return {items};
    } catch (error) {
        return { error }
    }
}

export default Paper;