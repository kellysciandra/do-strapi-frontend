import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader, Table } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import {AddItemContainer, ItemsContainer, ItemsHeader} from '../styles/index.styles'
import axios from 'axios';
import {isMobile} from 'react-device-detect';

const Ice = ({ accounts }) => {
    const [form, setForm] = useState({ account: '', balance: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const [accountInfo, setAccountInfo] = useState();

    useEffect(() => {
        axios({
            "method": "GET",
            "url": "https://do-strapi-backend-cnnh6.ondigitalocean.app/ices?_limit=500"
        })
        .then((response) => {
            setAccountInfo(response.data)
        })
    }, []);

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
    })

    const createItem = async () => {
        try {
            const res = await fetch('https://do-strapi-backend-cnnh6.ondigitalocean.app/ices?_limit=500', {
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
            err.account = 'Account is required';
        }
        if (!form.balance) {
            err.balance = 'Total is required';
        }

        return err;
    }

    return <>
        <AddItemContainer>
            <ItemsHeader>Add New Account</ItemsHeader>
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
                                error={errors.balance ? { content: 'Please enter a total', pointing: 'below' } : null}
                                label='Total $ Amount'
                                placeholder='Balance'
                                name='balance'
                                onChange={handleChange}
                            />
                            <Button color='purple' type='submit'>Add</Button>
                        </Form>
                }
            </div>
        </AddItemContainer>
        <IceAccounts accounts={accountInfo}/>
        
    </>
}


export default Ice;



const IceAccounts = ({accounts}) => {

    return <>
        <ItemsContainer>
        <ItemsHeader>Current Accounts</ItemsHeader>
            <Table unstackable celled>
                <Table.Header>
                <Table.Row> 
                    <Table.HeaderCell>Account</Table.HeaderCell>
                    <Table.HeaderCell>Balance</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                {accounts ? accounts.map(account => {
                    return <>
                        <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                           
                                    {account.account}
                              
                            </Table.Cell>
                            <Table.Cell>$ {account.balance}</Table.Cell>
                            <Table.Cell collapsing textAlign='right'>
                            <Link href={`/${account.id}/edit_ice`}>
                                    <Button color="orange">Edit</Button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                        </Table.Body>        
                    </>
                }): 'No Data'}
            </Table>
        </ItemsContainer>
    </>
};

