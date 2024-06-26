import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'

export function TrackCard({ index, track }) {
    return (
        <Link to={'/track/' + track.id}>
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
                        alt={track.name}
                        src={track.image}
                        className='object-cover aspect-square'
                    />
                </CardBody>
                <CardFooter className='w-full flex items-start gap-3'>
                    {index && (
                        <span className='text-xl font-bold text-guppie-green'>
                            {index}.
                        </span>
                    )}
                    <div className='w-full flex flex-col'>
                        <span className='text-xs sm:text-sm text-foreground-500 font-medium line-clamp-1'>
                            {track.artists}
                        </span>
                        <span className='text-sm sm:text-lg font-semibold line-clamp-1'>
                            {track.name}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
