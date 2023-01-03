import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Confirm, Button, Loader, Input } from 'semantic-ui-react';
import {CardContainer, ItemsContainer } from '../../styles/index.styles';
import Link from 'next/link';
import axios from 'axios';
import {isMobile} from 'react-device-detect';

const Item = ({ item }) => {
    const [confirm, setConfirm] = useState(false);
    const [products, setProducts] = useState()
    const [caseSize, setCaseSize] = useState('...');
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteItem();
        }
    }, [isDeleting]);

    useEffect(() => {
        if (isMobile) {
            window.scrollTo({ top: 450, behavior: 'smooth' })
        }
    }, []);

    const open = () => setConfirm(true);
    
    const close = () => setConfirm(false);

    const deleteItem = async () => {
        const itemId = router.query.id;
        try {
            const deleted = await fetch(`http://Kellys-Mac-mini.lan:1337/products/${itemId}`, {
                method: "Delete"
            });
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    const handleChange = (e) => {
        setCaseSize(
            item.cost / e.target.value  
        )
    }

    return (
        <ItemsContainer>
            {isDeleting 
                ? <Loader active />
                : <>
                    {item ? 
                        <CardContainer>
                        <Card>
                            <Card.Content header={item.name} />
                            <Card.Content description={`In Stock: ${item.qty}`}/>
                            <Card.Content description={`Tag: ${item.tag}`}/>
                            <Card.Content description={`Cost: ${item.cost || '...'}`}/>
                            <Card.Content description={`Vendor: ${item.vendor || '...'}`}/>
                            {/* <Card.Content extra>
                                <Input
                                    placeholder="Case Size / Total lbs"
                                    size="mini"
                                    onChange={handleChange}
                                />
                            </Card.Content>
                            <Card.Content description={`Cost Per: ${caseSize || '...'}`}/> */}
                           
                          
                            <Card.Content>
                                <Button size='mini' color="red" onClick={open}>Delete</Button>
                                <Link href={`/${item.id}/edit`}>
                                    <Button size='mini' color="orange">Edit</Button>
                                </Link>
                                <Button  color='green' size='mini' onClick={() => router.back()}>cancel</Button>
                            </Card.Content>
                        </Card>
                        </CardContainer> 
                    : null }
                </> 
            }
            <Confirm 
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </ItemsContainer>
        
    )
};


Item.getInitialProps = async ({ query: { id } }) => {
    try {
        const res = await axios.get(`http://Kellys-Mac-mini.lan:1337/products/${id}`);
        const item = res.data
        return {item};
    } catch (error) {
        return { error }
    }
}

export default Item;