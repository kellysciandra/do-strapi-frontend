import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import {EditContainer} from '../../styles/index.styles'
import { Button, Form, Loader, Dropdown, Select } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {isMobile} from 'react-device-detect';

const options = [
    {key: 'Food', text: 'Food', value: 'Food'},
    {key: 'Paper', text: 'Paper', value: 'Paper'},
    {key: 'Liquor', text: 'Liquor', value: 'Liquor'},
    {key: 'Beer', text: 'Beer', value: 'Beer'},
    {key: 'Wine', text: 'Wine', value: 'Wine'},
    {key: 'Chemical', text: 'Chemical', value: 'Chemical'},
    {key: 'Tshirt', text: 'Tshirt', value: 'Tshirt'},
    {key: 'Coke', text: 'Coke', value: 'Coke'},
]
const Edit = ({ item }) => {
    const [form, setForm] = useState({ name: item.name, qty: item.qty, tag: item.tag, cost: item.cost, vendor: item.vendor, sort_1: item.sort_1 });
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
    }, [errors]);

    useEffect(() => {
        if (isMobile) {
            window.scrollTo({ top: 450, behavior: 'smooth' })
        }
    }, []);

    const updateItem = async () => {
        try {
            const res = await fetch(`https://whale-app-v7zkn.ondigitalocean.app/products/${item.id}`, {
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
                                error={errors.tag ? { content: 'Please enter a cost', pointing: 'below' } : null}
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
                            <Button  color='green' onClick={() => router.back()}>cancel</Button>
                        </Form>
                }
            </div>
        </EditContainer>
    )
}

Edit.getInitialProps = async ({ query: { id } }) => {
    try {
        const res = await axios.get(`https://whale-app-v7zkn.ondigitalocean.app/products/${id}`);
        const item = res.data
        return {item};
    } catch (error) {
        return { error }
    }
}

export default Edit;