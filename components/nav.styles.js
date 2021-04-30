import styled from 'styled-components';

import {device} from '../styles/breakpoints'

const NavbarContainer = styled.div`
  position: fixed;
  top: 75px;
  width: 100%;
  height: 5rem;
  transition: 0.25s ease-in-out;
  cursor: url(hand.cur), pointer;
  @media only screen and (max-width: 600px) {
    top: 0;
    position: relative;
    height: auto;
  }
`;

const NavLink = styled.div`
  display: flex;
  font-weight: bold;
  margin: 1rem 0 0 5rem;
  text-decoration: none;
  cursor: url(hand.cur), pointer;
  padding:0 0 20px 0;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.5em;

  @media only screen and (max-width: 600px) {
    border: 2px solid skyblue;
    margin: 4px 0 0 0;
    padding: 10px;
    height: 40px;
    font-size: 1.25em;
    justify-content: center;
  }
`;

export {NavbarContainer, NavLink}