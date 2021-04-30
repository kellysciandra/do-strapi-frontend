import Link from 'next/link';
import {NavbarContainer, NavLink} from './nav.styles.js'

const Navbar = () => (
    <NavbarContainer>
        <NavLink>
            <Link href="/">
                <a className="navlink">Home</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/food">
                <a className="navlink">Food</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/liquor">
                <a className="navlink">Liquor</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/paper">
                <a className="navlink">Paper</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/new">
                <a className="navlink">Add Item</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/order">
                <a className="navlink">Add To Order</a>
            </Link>
        </NavLink>
        <NavLink>
            <Link href="/past">
                <a className="navlink">Today's Order</a>
            </Link>
        </NavLink>
    </NavbarContainer>
)

export default Navbar;