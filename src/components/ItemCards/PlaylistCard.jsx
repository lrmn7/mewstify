import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

export function PlaylistCard({ playlist }) {
    return (
        <Link to={'/playlist/' + playlist.id}>
            <Card
                radius='lg'
                shadow='none'
                className='col-span-1 bg-transparent'
            >
                <CardBody className='p-0'>
                    <Image
                        isZoomed
                        width='100%'
                        height={400}
                        alt={playlist.title}
                        src={playlist.image}
                        className='object-cover aspect-square'
                    />
                </CardBody>
                <CardFooter className='w-full flex flex-col  items-start'>
                    <span className='text-sm sm:text-lg font-semibold line-clamp-1'>
                        {playlist.title}
                    </span>
                    <span className='text-xs sm:text-sm text-foreground-500 font-medium line-clamp-1'>
                        {playlist.isPublic === false ? 'Private' : 'Public'}
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
}
