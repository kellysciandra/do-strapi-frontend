import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import {EditContainer, ItemsHeader} from '../../styles/index.styles'
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditIce = ({ x }) => {
    const [form, setForm] = useState({ account: x.account, balance: x.balance });
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

    const updateItem = async () => {
        try {
            const res = await fetch(`http://Kellys-Mac-mini.lan:1337/ices/${x.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
        
                body: JSON.stringify(form)
            })
            router.push("/ice");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const validate = () => {
        let err = {};

        if (!form.account) {
            err.account = 'Acount is required';
        }
        if (!form.balance) {
            err.balance = 'Balance is required';
        }
        return err;
    };

    const handleDelete = async () => {
        const itemId = x.id;
        try {
            const deleted = await fetch(`http://Kellys-Mac-mini.lan:1337/ices/${itemId}`, {
                method: "Delete"
            });
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    };

    const handleBack = () => {
        router.push("/ice");
    };

    const addFifty = () => {
        setForm(form.balance = form.balance + 15)
        
    };

    return <>
        <EditContainer>
            <h1>Update Item</h1>
                <div>
                    {
                        isSubmitting
                            ? <Loader active inline='centered' />
                            : <Form onSubmit={handleSubmit}>
                                <Form.Input
                                    fluid
                                    error={errors.total ? { content: 'Please enter the account name', pointing: 'below' } : null}
                                    label='Account'
                                    placeholder='Account'
                                    name='account'
                                    value={form.account}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    fluid
                                    label='Account Balance'
                                    placeholder='Balance'
                                    name='balance'
                                    error={errors.balance ? { content: 'Please enter the account balance', pointing: 'below' } : null}
                                    value={form.balance}
                                    onChange={handleChange}
                                />
                                <Button size='mini' color='purple' type='submit'>Update</Button>
                                <Button size='mini' color='red' onClick={() => handleDelete()}>Delete</Button>
                                <Button size='mini' color='green' onClick={() => handleBack()}>Cancel</Button>
                            </Form>
                    }
                </div>
        </EditContainer>
    </>
};

EditIce.getInitialProps = async ({ query: { id } }) => {
    try {
        const res = await axios.get(`http://Kellys-Mac-mini.lan:1337/ices/${id}`);
        const x = res.data
        return {x};
    } catch (error) {
        return { error }
    }
};

export default EditIce;