import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import {AddItemContainer, ItemsHeader} from '../styles/index.styles'

const Ice = ({ accounts }) => {
    const [form, setForm] = useState({ account: '', total: '' });
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

    const createItem = async () => {
        try {
            const res = await fetch('https://do-strapi-backend-cnnh6.ondigitalocean.app/ice?_limit=500', {
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

        if (!form.account) {
            err.account = 'Product is required';
        }
        if (!form.total) {
            err.total = 'Total is required';
        }

        return err;
    }

    return <>
        <AddItemContainer>
            <ItemsHeader>Add To Account</ItemsHeader>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.account ? { content: 'Please enter a account', pointing: 'below' } : null}
                                label='Account'
                                placeholder='Account'
                                name='account'
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.qty ? { content: 'Please enter a qty', pointing: 'below' } : null}
                                label='Total'
                                placeholder='Total'
                                name='total'
                                onChange={handleChange}
                            />

                            <Button type='submit'>Add</Button>
                        </Form>
                }
            </div>
        </AddItemContainer>
        {console.log(accounts)}
        
    </>
}

Ice.getInitialProps = async () => {
    try {
        const res = await axios.get(`https://localhost:1337/ice`);
        const accounts = res.data
        return { accounts };
    } catch (error) {
        return { error }
    }
}


export default Ice;