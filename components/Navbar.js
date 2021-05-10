import Link from 'next/link';
import { Dropdown } from 'semantic-ui-react';
import {DropDownLink, NavbarContainer, NavLink, SearchLink} from './nav.styles.js'

const options = [
    {
      key: 1,
      text: 'Food',
      value: 1,
      content: (
        <Link href="/food">
        <a className="navlink">Food</a>
        </Link>
      ),
    },
    {
      key: 2,
      text: 'Beer, Wine, Liquor',
      value: 2,
      content: (
        <Link href="/liquor">
        <a className="navlink">Beer, Wine, Liquor</a>
        </Link>
      ),
    },
    {
      key: 3,
      text: 'Paper',
      value: 3,
      content: (
        <Link href="/paper">
        <a className="navlink">Paper</a>
        </Link>
      ),
    },
    {
        key: 4,
        text: 'T-Shirts',
        value: 4,
        content: (
          <Link href="/tshirt">
          <a className="navlink">Tshirts</a>
          </Link>
        ),
    },
      {
        key: 5,
        text: 'Chemicals',
        value: 5,
        content: (
          <Link href="/chemical">
          <a className="navlink">Chemicals</a>
          </Link>
        ),
    },
    {
        key: 6,
        text: 'Coke',
        value: 6,
        content: (
          <Link href="/coke">
          <a className="navlink">Coke Products</a>
          </Link>
        ),
    },
  ]

const Navbar = () => (
    <NavbarContainer>
        <NavLink>
            <Link href="/">
                <a className="navlink">Home</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/new">
                <a className="navlink">Add New Item</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/order">
                <a className="navlink">Add To Order</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/past">
                <a className="navlink">Daily Order</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/ice">
                <a className="navlink">Ice Accounts</a>
            </Link>
        </NavLink>
        <SearchLink>
            <Link href="/search">
                <a className="navlink">Search</a>
            </Link>
        </SearchLink>
        <DropDownLink>
            <Dropdown selection  options={options} placeholder='Choose an option' />
        </DropDownLink>
    </NavbarContainer>
)

export default Navbar;