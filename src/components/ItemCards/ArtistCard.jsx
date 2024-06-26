import { Link } from 'react-router-dom'
import { Avatar, Card, CardBody, CardFooter } from '@nextui-org/react'

export function ArtistCard({ index, artist }) {
    return (
        <Link to={'/artist/' + artist.id}>
            <Card
                radius='lg'
                shadow='none'
                className='col-span-1 bg-transparent'
            >
                <CardBody className='p-1'>
                    <Avatar
                        size='lg'
                        showFallback
                        alt={artist.name}
                        src={artist.image}
                        className='w-full h-full object-cover aspect-square'
                    />
                </CardBody>
                <CardFooter className='w-full flex justify-center items-start gap-3'>
                    {index && (
                        <span className='text-xl font-bold text-guppie-green'>
                            {index}.
                        </span>
                    )}
                    <span className='text-sm sm:text-lg font-semibold line-clamp-1'>
                        {artist.name}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
}
