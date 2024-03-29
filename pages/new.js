import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import {AddItemContainer, ItemsHeader} from '../styles/index.styles'
import {isMobile} from 'react-device-detect';

const NewItem = () => {
    const [form, setForm] = useState({ product: '', total: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createItem();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    useEffect(() => {
        if (isMobile) {
            window.scrollTo({ top: 450, behavior: 'smooth' })
        }
    }, []);

    const createItem = async () => {
        try {
            const res = await fetch('https://whale-app-v7zkn.ondigitalocean.app/products?_limit=500', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.name) {
            err.name = 'Product is required';
        }
        if (!form.qty) {
            err.qty = 'Total is required';
        }

        return err;
    }

    return (
        <AddItemContainer>
            <ItemsHeader>Add Item</ItemsHeader>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.name ? { content: 'Please enter a product', pointing: 'below' } : null}
                                label='Product'
                                placeholder='Product'
                                name='name'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Quantity'
                                placeholder='Quantity'
                                name='qty'
                                error={errors.qty ? { content: 'Please enter a total quantity', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Tag'
                                placeholder='Food, Paper, Liquor, Chemical, TShirt'
                                name='tag'
                                error={errors.tag ? { content: 'Please enter a tag', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Cost'
                                placeholder='Cost'
                                name='cost'
                                error={errors.cost ? { content: 'Please enter a cost', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Vendor'
                                placeholder='Vendor'
                                name='vendor'
                                error={errors.vendor ? { content: 'Please enter a vendor', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button color='purple' type='submit'>Add</Button>
                            <Button  color='green' onClick={() => router.back()}>cancel</Button>
                        </Form>
                }
            </div>
        </AddItemContainer>
    )
}

export default NewItem;