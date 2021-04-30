import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Confirm, Button, Loader } from 'semantic-ui-react';
import {CardContainer, ButtonContainer, ItemsContainer, ItemsHeader} from '../../styles/index.styles';
import Link from 'next/link';
import axios from 'axios';
import Index from '..';

const Item = ({ item }) => {
    const [confirm, setConfirm] = useState(false);
    const [products, setProducts] = useState()
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteItem();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);
    
    const close = () => setConfirm(false);

    const deleteItem = async () => {
        const itemId = router.query.id;
        try {
            const deleted = await fetch(`https://do-strapi-backend-cnnh6.ondigitalocean.app/products/${itemId}`, {
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

    return (
        <ItemsContainer>
            {isDeleting 
                ? <Loader active />
                : <>
                    {item ? 
                        <CardContainer>
                        <Card>
                            <Card.Content header={item.name} />
                            <Card.Content description={`Total: ${item.qty}`}/>
                            <Card.Content description={`${item.tag}`}/>
                            <Card.Content description={`Cost: ${item.cost}`}/>
                            <Card.Content description={`Vendor: ${item.vendor}`}/>
                            <Card.Content extra>
                                <Button color="red" onClick={open}>Delete</Button>
                                <Link href={`/${item.id}/edit`}>
                                    <Button color="orange">Edit</Button>
                                </Link>
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
        const res = await axios.get(`http://localhost:1337/products/${id}`);
        const item = res.data
        return {item};
    } catch (error) {
        return { error }
    }
}

export default Item;