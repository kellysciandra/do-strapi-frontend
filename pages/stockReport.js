import { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { AddItemContainer, OutOfStockHeader } from "../styles/index.styles";
import {isMobile} from 'react-device-detect';
import { useRouter } from 'next/router';

const StockReport = ({ products }) => {
    const [out, setOut] = useState([])
    const [form, setForm] = useState({ email: '', message: out});
    const [selection, setSelection] = useState('')
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
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
            window.scrollTo({ top: 350, behavior: 'smooth' })
        }
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.email) {
            err.email = 'Email is required';
        }
        return err;
    }

    const handleSubmit = () => {
  
        const out = products.filter(product => product.qty < 2)
        const tag = out.filter(product => product.tag === selection)
        const name = tag.map(product => product.name)
        const test = JSON.stringify(name)

        let data = {form, test}

        fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((res) => {
            console.log('Response received')
            router.push("/");
        })
    }

    return <>
  
        <h1 style={{marginTop: '50px'}}>Running Low</h1>
        <AddItemContainer>
            <OutOfStockHeader>Food</OutOfStockHeader>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.email ? { content: 'Please enter a Email', pointing: 'below' } : null}
                                label='Email'
                                placeholder='Email'
                                name='email'
                                onChange={handleChange}
                            />
                            <Button fluid color='blue' type='submit' onClick={() => setSelection('Food')}>Send</Button>
                        </Form>
                }
            </div>

            <OutOfStockHeader>Paper</OutOfStockHeader>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.email ? { content: 'Please enter a Email', pointing: 'below' } : null}
                                label='Email'
                                placeholder='Email'
                                name='email'
                                onChange={handleChange}
                            />
                            <Button fluid color='blue' type='submit' onClick={() => setSelection('Paper')}>Send</Button>
                        </Form>
                }
            </div>

            <OutOfStockHeader>Beer, Wine, Liquor</OutOfStockHeader>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.email ? { content: 'Please enter a Email', pointing: 'below' } : null}
                                label='Email'
                                placeholder='Email'
                                name='email'
                                onChange={handleChange}
                            />
                            <Button fluid color='blue' type='submit' onClick={() => setSelection('Liquor')}>Send</Button>
                        </Form>
                }
            </div>
        </AddItemContainer>
    </>
}

StockReport.getInitialProps = async (ctx) => {
    const res = await fetch('https://do-strapi-backend-cnnh6.ondigitalocean.app/products?_limit=500');
    const data = await res.json();
    return { products: data }
}


export default StockReport;






