import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Image, CircularProgress } from '@nextui-org/react'
import { TopItemCard } from '../TopItemCard'
import { LinkButton } from '../Button'
import { useTimeRange } from '../../hooks'
import getTopTracks from '../../api/getTopTracks'

export function TopTrack() {
    const { timeRange } = useTimeRange()
    const [topTrack, setTopTrack] = useState([])

    useEffect(() => {
        async function fetchTopTrack() {
            const response = await getTopTracks(timeRange, '1')
            setTopTrack(response[0])
        }

        fetchTopTrack()
    }, [timeRange])

    return (
        <section className='relative w-full h-full'>
            <Link href={'/track/' + topTrack.id}>
                <TopItemCard title='Your Top Track'>
                    {topTrack.image === undefined
                        ? <CircularProgress color='success' />
                        : <Image
                            width={600}
                            height='100%'
                            alt={topTrack.name}
                            src={topTrack.image}
                            className='w-fit sm:w-60 object-cover aspect-square'
                        />
                    }
                    <div className='flex flex-col pl-0 md:pl-12 z-30'>
                        <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold line-clamp-1 mt-2'>{topTrack.name}</h3>
                        <span className='text-sm sm:text-base md:text-lg lg:text-xl font-medium text-foreground/80 line-clamp-1'>{topTrack.artists}</span>
                    </div>
                </TopItemCard>
            </Link>
            <LinkButton href={topTrack.url} />
        </section>
    )
}
