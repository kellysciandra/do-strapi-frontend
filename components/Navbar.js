
import Link from 'next/link';
<<<<<<< HEAD

import {NavbarContainer, NavLink, SearchLink} from './nav.styles.js'
=======
import { Dropdown } from 'semantic-ui-react';
import {DropDownLink, NavbarContainer, NavLink, SearchLink, IceLink} from './nav.styles.js'

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
>>>>>>> a460b9e1e2295157a29db0f2aa5d383ea70e8ecb

const Navbar = () => (
    <NavbarContainer>
        <NavLink>
            <Link prefetch href="/">
                Home
            </Link>
        </NavLink>
        <NavLink>
            <Link prefetch href="/new">
                Add New Item
            </Link>
        </NavLink>
        <NavLink>
            <Link prefetch href="/order">
                Add To Order
            </Link>
        </NavLink>
        <NavLink>
            <Link prefetch href="/past">
                Daily Order
            </Link>
        </NavLink>
        <NavLink>
            <Link prefetch href="/stockReport">
                Stock Reports
            </Link>
        </NavLink>
        <IceLink>
            <Link prefetch href="/ice">
                Ice Accounts
            </Link>
        </IceLink>
        <SearchLink>
            <Link prefetch href="/search">
                Search
            </Link>
        </SearchLink>
<<<<<<< HEAD

=======
        <DropDownLink>
            <Dropdown  selection  options={options} placeholder='Choose an option' />
        </DropDownLink>
>>>>>>> a460b9e1e2295157a29db0f2aa5d383ea70e8ecb
    </NavbarContainer>
)

export default Navbar;