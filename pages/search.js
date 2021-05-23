import Link from 'next/link';
import { Button, Table, Input, Popup } from 'semantic-ui-react';
import {ItemsContainer, ItemsHeader} from '../styles/index.styles'
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditOrder from '../components/EditOrder';
import {isMobile} from 'react-device-detect';

const Search = () => {
    const [products, setProducts] = useState();
    const [searchedItems, setSearchedItems] = useState();
    const [currentItem, setCurrentItem] = useState({});
    const [currentOrder, setCurrentOrder] = useState([]);
    const [open, setOpen] = useState(false);
 
    useEffect(() => {
        axios({
            "method": "GET",
            "url": "https://do-strapi-backend-cnnh6.ondigitalocean.app/products?_limit=500"
        })
        .then((response) => {
            setProducts(response.data)
        })
    }, []);

    useEffect(() => {
        if (isMobile) {
            window.scrollTo({ top: 350, behavior: 'smooth' })
        }
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

    const handleChange = (e) => {
         let newList = [];
         newList = products.filter(x => {
             const lc = x.name.toLowerCase();
             const search = e.target.value.toLowerCase();
             return lc.includes(search)
         })
         setSearchedItems(newList)
    }

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

    return <>
        <ItemsContainer>
            <ItemsHeader>Search</ItemsHeader>
            <Input  
                icon='search'
                fluid
                placeholder='Search...'
                onChange={handleChange}
            />
                <Table unstackable celled>
                    <Table.Header>
                    <Table.Row> 
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Stock</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                
                        {searchedItems ? searchedItems.map(item => {
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
                                            <Button size='mini' primary>View</Button>
                                        </Link>
                                        <Popup
                                            trigger={ <Button size='mini' color='purple' onClick={() => handleOpen(item)}>Add</Button> }
                                            on='click'
                                            onClose={false}
                                            // onOpen={() => setOpen(true)}
                                            position='top right'
                                            content={<EditOrder item={currentItem} handleModal={updateModal} name={currentItem.name} updateOrder={updateCurrentOrder} productID={currentItem.id}/>}
                                        >
                                        </Popup>
                                        </Table.Cell>
                                </Table.Row>
                            </Table.Body>        
                        </>
                        }): ''}
                      
                </Table>
        </ItemsContainer>
    </>
};

export default Search;