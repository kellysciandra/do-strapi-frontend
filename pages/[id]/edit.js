import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import {EditContainer, ItemsHeader} from '../../styles/index.styles'
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Edit = ({ item }) => {
    const [form, setForm] = useState({ name: item.name, qty: item.qty, tag: item.tag, cost: item.cost, vendor: item.vendor });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateItem();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateItem = async () => {
        try {
            const res = await fetch(`https://do-strapi-backend-cnnh6.ondigitalocean.app/products/${item.id}`, {
                method: 'PUT',
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
        <EditContainer>
            <h1>Update Item</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.name ? { content: 'Please enter a product', pointing: 'below' } : null}
                                label='Name'
                                placeholder='Name'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Quantity'
                                placeholder='Quantity'
                                name='qty'
                                error={errors.qty ? { content: 'Please enter a total quantity', pointing: 'below' } : null}
                                value={form.qty}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Tag'
                                placeholder='Tag'
                                name='tag'
                                error={errors.tag ? { content: 'Please enter a tag', pointing: 'below' } : null}
                                value={form.tag}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Cost'
                                placeholder='Cost'
                                name='cost'
                                error={errors.cost ? { content: 'Please enter a cost', pointing: 'below' } : null}
                                value={form.cost}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                label='Vendor'
                                placeholder='Vendor'
                                name='vendor'
                                error={errors.vendor ? { content: 'Please enter a vendor', pointing: 'below' } : null}
                                value={form.vendor}
                                onChange={handleChange}
                            />
                            <Button color='purple' type='submit'>Update</Button>
                        </Form>
                }
            </div>
        </EditContainer>
    )
}

Edit.getInitialProps = async ({ query: { id } }) => {
    try {
        const res = await axios.get(`https://do-strapi-backend-cnnh6.ondigitalocean.app/products/${id}`);
        const item = res.data
        return {item};
    } catch (error) {
        return { error }
    }
}

export default Edit;
