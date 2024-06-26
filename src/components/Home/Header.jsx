import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { LinkButton } from '../Button'
import { useCurrentUser } from '../../hooks'

export function Header() {
    const { currentUser } = useCurrentUser()

    return (
        <Card className='grid grid-cols-12 shadow-none py-8 px-4'>
            <CardHeader className='col-span-full sm:col-span-1 sm:row-span-2 items-center justify-center'>
                <Avatar
                    isBordered
                    showFallback
                    size='lg'
                    color='success'
                    src={currentUser ? currentUser.image : ''}
                    className='w-16 h-auto aspect-square'
                />
                <LinkButton href={currentUser.url} />
            </CardHeader>
            <CardBody className='col-span-full sm:col-span-11 items-start py-1'>
                <span className='text-3xl sm:text-5xl font-bold place-items-center line-clamp-2'>
                    {currentUser ? (
                        <span className='flex flex-wrap justify-center gap-0 sm:gap-3'>
                            Welcome, <span className='text-guppie-green'>{currentUser.name}</span>
                        </span>
                    ) : (
                        'Log in to see your stats'
                    )}
                </span>
            </CardBody>
            <CardFooter className='col-span-full sm:col-span-11 justify-center sm:justify-start py-0 gap-3'>
                <Chip
                    variant='flat'
                    startContent={<FontAwesomeIcon icon={faCircle} />}
                    color={currentUser.product === 'free' ? 'success' : 'warning'}
                    className='text-xs sm:text-base font-medium capitalize pl-2'
                >
                    {currentUser.product}
                </Chip>
                <span className='text-foreground-500 text-base sm:text-xl font-medium'>
                    Here are your stats
                </span>
            </CardFooter>
        </Card >
    )
}
