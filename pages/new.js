import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import {AddItemContainer, ItemsHeader} from '../styles/index.styles'
import {isMobile} from 'react-device-detect';
import axios from 'axios';

const options = [
    { key: 'p', text: 'Paper', value: 'Paper' },
    { key: 'f', text: 'Food', value: 'Food' },
    { key: 'c', text: 'Chemical', value: 'Chemical' },
    { key: 'ck', text: 'Coke', value: 'Coke' },
    { key: 't', text: 'T-Shirt', value: 'T-Shirt' },
    { key: 'l', text: 'Liquor', value: 'Liquor' },
     { key: 'l', text: 'Beer', value: 'Beer' },
     { key: 'l', text: 'Wine', value: 'Wine' },
  ]

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

    const createItem = () => {
        axios.post('http://localhost:1337/api/products' , 
        {
            "data": {
                name: form.name,
                qty: form.qty,
                cost: form.cost,
                tag: form.tag,
                vendor: form.vendor
            }
        })
        .then(respose => {
            console.log(respose)
            router.push("/");
        })
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
                            <Form.Select
                                fluid
                                label='Tag'
                                options={options}
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