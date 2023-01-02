import { faCheckDouble, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { format } from 'path';
import React, { useState } from 'react';
import { Button, Card, Form } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NumberInputExample = ({startingValue, handleChange, product}) => {
    const [form, setForm] = useState({ qty: startingValue })
    const [initialQty, setInitialQty] = useState()
    const router = useRouter();

    const changeValue = () => {
        const run = axios.put(`http://localhost:1337/api/orders/${product.id}` , 
        {
            "data": {
                qty: form.qty,
            }
        })
        .then(response => {
            console.log(response)
        })
        run
    }

    const getDataPointOne = () => { 
        const run = axios({
            "method": "GET",
            "url": `http://localhost:1337/api/products/${product.attributes.productID}`
        })
        .then((response) => { 
            setInitialQty(response.data.data.attributes.qty)
        })
        run
        console.log(form.qty, initialQty)
    }


    const handleSuccess = () => {
        changeValue()
        getDataPointOne()

        axios.put(`http://localhost:1337/api/products/${product.attributes.productID}`, 
        {
            "data": {
                qty: initialQty - form.qty
            }
        })
    }

    const handleDelete = async () => {
    
        // const deleteRecord = await axios({
        //     "method": "DELETE",
        //     "url": `http://localhost:1337/api/orders/${product.id}`
        // })
        // .then((response) => {
        //     console.log(response)
        // })
        // .catch(error => {
        //     console.log(error.response)
        //  })

        // deleteRecord
        router.push("/past");
    };

    return <> 
            <Form>
                <Form.Input 
                    placeholder={startingValue} 
                    name="qty"
                    onChange={(e) => setForm({qty: e.target.value})}/>
            </Form>

            <Card.Content extra>
                <Button 
                    size="tiny" 
                    color="red"
                    onClick={() => handleDelete()}
                ><FontAwesomeIcon icon={faTrash} /></Button>
                <Button 
                    size="tiny" 
                    color="green"
                    onClick={() => handleSuccess()}
                ><FontAwesomeIcon icon={faCheckDouble} /></Button> 
            </Card.Content> 

              {/* {changeValue()} */}
    </>
}

export default NumberInputExample;