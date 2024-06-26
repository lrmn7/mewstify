import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { SpotifyButton } from '../Button'
import { SearchInput } from '../Search'
import { useCurrentUser } from '../../hooks'
import { logIn, logOut } from '../../api/getAuth'
import { Logo } from '../../assets/icons'

const menuItems = [
    { name: 'Profile', href: '/home' },
    { name: 'Top', href: '/top' },
    { name: 'Recently played', href: '/recently' },
    { name: 'Log out', href: '/' },
]

export function NavbarHome() {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { currentUser } = useCurrentUser()

    const signOut = () => {
        localStorage.clear()
        window.location.pathname = '/'
    }

    const navbarItems = menuItems.slice(0, 3).map((item, index) => (
        <NavbarItem
            key={index}
            className={`font-semibold ${location.pathname === item.href ? 'text-guppie-green' : 'text-foreground-500'}`}
        >
            <Link to={item.href}>
                {item.name}
            </Link>
        </NavbarItem>
    ))

    const dropdownItems = menuItems.map((item, index) => (
        <NavbarMenuItem
            key={index}
            className={
                'font-semibold ' +
                (location.pathname === item.href ? 'text-guppie-green' : 'text-foreground-500') +
                (index === menuItems.length - 1 ? ' text-danger' : '')
            }
            onClick={index === menuItems.length - 1 ? signOut : undefined}
        >
            <Link to={item.href}>
                {item.name}
            </Link>
        </NavbarMenuItem>
    ))

    const handleNavbarBrandClick = () => {
        history.push('/home')
    }

    return (
        <Navbar maxWidth='xl' height={'6rem'} className={'bg-chinese-black'} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                {currentUser &&
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className='sm:hidden'
                    />
                }
                <NavbarBrand>
                <Link to='/home' onClick={handleNavbarBrandClick} className='flex items-center'>
                        <Logo classNames='hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 mr-2' />
                        <p className='hidden sm:flex text-2xl font-bold text-inherit'>Mewstify</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            {currentUser &&
                <NavbarContent className='hidden sm:flex gap-4' justify='center'>
                    {navbarItems}
                </NavbarContent>
            }

            <NavbarContent as='div' justify='end'>
                {currentUser ? (
                    <NavbarContent justify='end'>
                        <SearchInput />
                        <Dropdown placement='bottom-end'>
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    size='sm'
                                    as='button'
                                    color='success'
                                    src={currentUser.image}
                                    name={currentUser.display_name}
                                    className='aspect-square transition-transform'
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label='Profile Actions' variant='flat'>
                                <DropdownItem key='profile' className='h-14 gap-2'>
                                    <p className='text-guppie-green font-semibold'>Logged in as</p>
                                    <p className='font-semibold'>{currentUser.email}</p>
                                </DropdownItem>
                                <DropdownItem key='github' href='https://github.com/lrmn7/mewstify' target='_blank'>
                                    GitHub
                                </DropdownItem>
                                <DropdownItem key='donate' href='https://www.paypal.com/paypalme/romanromannya' target='_blank'>
                                    Donate
                                </DropdownItem>
                                <DropdownItem key='logout' color='danger' startContent={<FontAwesomeIcon icon={faSignOut} />} onClick={logOut}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                ) : (
                    <SpotifyButton
                        isFlat
                        onPress={logIn}
                    >
                        Log in with Spotify
                    </SpotifyButton>
                )}
            </NavbarContent>

            {currentUser &&
                <NavbarMenu>
                    {dropdownItems}
                </NavbarMenu>
            }
        </Navbar>
    )
}
