import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import moment from 'moment'
import { EditItemsContainer, EditHeader } from '../styles/index.styles';
import axios from 'axios';

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

    const updateItem = () => {
        axios.post('http://localhost:1337/api/orders' , 
        {
            "data": {
                name: form.name,
                qty: form.qty,
                date: form.date,
                productID: productID
            }
        })
        .then(response => { console.log(response)
            handleModal(false)
            updateOrder(form)
            // router.reload(window.location.pathname);
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

        if (!form.qty) {
            err.qty = 'Total is required';
        }

        return err;
    }

    const convertDate = (date) => { 
        var momentDate = moment(date).format("MMM Do YY");
        console.log(momentDate)
        return momentDate;
    };

    const handleBack = () => {
        router.reload(window.location.pathname);
    }

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
                                value={item.attributes.name}
                            />
                            <Form.Input
                                fluid
                                label='Quantity'
                                placeholder={item.attributes.qty === 0 ? 'ITEM IS OUT OF STOCK' : 'Quantity'}
                                name='qty'
                                error={errors.qty ? { content: 'Please enter a total quantity', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Button  size='mini' type='submit'>Update</Button>
                            <Button size='mini' onClick={() => handleBack()}>Cancel</Button>
                        </Form>
                }
            </>
        </EditItemsContainer>
    )
}

export default EditOrder;