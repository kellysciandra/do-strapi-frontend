import styled from 'styled-components';
import {device} from './breakpoints'

const ItemsContainer = styled.div`
    width: 50vw;
    margin: 10em 0 10em 35em;
    font-family: 'IBM Plex Mono', monospace;

    @media ${device.mobileM} {
        width: 90%;
        margin: 5em auto;
    }
`;

const AddItemContainer = styled.div`
    width: 50vw; 
    margin: 10em 0 10em 35em;
    font-family: 'IBM Plex Mono', monospace;

    @media ${device.mobileM} {
        width: 80%;
        margin: 5em auto;
    }
`;

const EditItemsContainer = styled.div`

    font-family: 'IBM Plex Mono', monospace;
    width: 100%;
    height: 100%;
    @media ${device.mobileM} {
        /* width: 80%;
        margin: 5em auto; */
    }
`

const EditContainer = styled.div`
    width: 50vw;
    margin: 10em 0 10em 35em;
    font-family: 'IBM Plex Mono', monospace;

    @media ${device.mobileM} {
        width: 80%;
        margin: 5em auto;
    }
`;

const CurrentOrderContainer = styled.div`
    margin: 0 0 0 0;
    font-family: 'IBM Plex Mono', monospace 
`

const CurrentOrderSubmit = styled.div`
    display: flex;
    justify-content: center;
    margin: 2em auto;
`;

const ItemsHeader = styled.div`
    font-size: 2em;
    display: flex;
    justify-content: center;
    margin: 0 0 2em 0;

    @media ${device.mobileM} {
        width: 100%;
    }
`;

const DateHeader = styled.div`
    font-size: 2em;
    background-color: aliceblue;

    display: flex;
    justify-content: center;
    margin: 0 0 2em 0;
    padding: 10px;

    @media ${device.mobileM} {
        width: 100%;
    }
`;

const OrderContainer = styled.div`
    display: flex;
    width: 50vw;
    margin: 10em 0 10em 40em;
    font-family: 'IBM Plex Mono', monospace
`
const OrderHeader = styled.div`
    font-size: 2em;
    display: flex;
    justify-content: center;
    margin: 2em auto;
`;

const ListTitle = styled.div`
    font-size: 1.5em;
    align-items: center;
    text-align: center;
    margin: 0 0 2em 0;
    border: 1px solid salmon;
    padding: .5em;
`

const ListContainer = styled.div`
    margin: 0 0 0 5em;
    font-family: 'IBM Plex Mono', monospace
`;

const ListButton = styled.div`
  border: 10px solid;
`

const OrderSubmit = styled.div`
    margin: 5em 0 0 0;
`;


const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 0 0 1em 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.25em;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`



export {DateHeader, EditContainer, EditItemsContainer, AddItemContainer, ItemsContainer, CardContainer, ButtonContainer, ItemsHeader, ListContainer, OrderContainer, OrderHeader, ListTitle, OrderSubmit, ListButton, CurrentOrderContainer, CurrentOrderSubmit}