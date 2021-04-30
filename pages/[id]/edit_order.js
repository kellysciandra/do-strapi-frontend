import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import moment from 'moment'
import { EditItemsContainer, EditHeader } from '../../styles/index.styles';

const EditOrder = ({ item, handleModal, updateOrder, name, productID }) => {
    const [form, setForm] = useState({ name: name, qty: 0, date: new Date(), product: productID });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const today = new Date();

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
            const res = await fetch('https://do-strapi-backend-cnnh6.ondigitalocean.app/orders', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            })
            handleModal(false)
            updateOrder(form)
            router.push("/order");
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

        if (!form.qty) {
            err.qty = 'Total is required';
        }

        return err;
    }

    const convertDate = (date) => {
        var momentDate = moment(date).format("MMM Do YY");
        return momentDate;
    };

    return (
        <EditItemsContainer>
            <EditHeader>Order Item</EditHeader>
            <>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                label='Date'
                                placeholder='Date'
                                name='date'
                                value={convertDate(today)}
                            />
                            <Form.Input
                                label='Name'
                                placeholder='Name'
                                name='name'
                                value={name}
                            />
                            <Form.Input
                                fluid
                                label='Quantity'
                                placeholder='Quantity'
                                name='qty'
                                error={errors.qty ? { content: 'Please enter a total quantity', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Update</Button>
                        </Form>
                }
            </>
        </EditItemsContainer>
    )
}

export default EditOrder;