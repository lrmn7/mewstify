import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardFooter, Image, Button, Link as NextLink } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

export function ArtistListCard({ index, artist }) {
    return (
        <Card
            radius='lg'
            className='flex flex-row shadow-none border-none'
        >
            <CardHeader className='hidden w-14 sm:flex items-center justify-center mr-3'>
                <span className='text-sm sm:text-lg font-bold mr-3'>
                    {index}.
                </span>
            </CardHeader>
            <Link href={'/artist/' + artist.id} className='w-full flex bg-black/20 rounded-xl'>
                <CardBody className='flex flex-row items-center pr-0 gap-4'>
                    <Image
                        isZoomed
                        width={50}
                        height={50}
                        radius='sm'
                        alt={artist.name}
                        src={artist.image}
                        className='w-auto h-auto object-cover aspect-square'
                    />
                    <span className='w-full text-sm sm:text-lg font-semibold line-clamp-2'>
                        {artist.name}
                    </span>
                </CardBody>
                <CardFooter className='w-fit flex-none pl-0'>
                    <Button
                        isIconOnly
                        as={NextLink}
                        target='_blank'
                        variant='light'
                        href={artist.url}
                    >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </Button>
                </CardFooter>
            </Link>
        </Card>
    )
}
