import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { PlaylistCard } from '../ItemCards'
import getUserPlaylists from '../../api/getUserPlaylists'
import '@splidejs/react-splide/css'

export function Playlists() {
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        async function fetchPlaylists() {
            const response = await getUserPlaylists()
            setPlaylists(response)
        }

        fetchPlaylists()
    }, [])

    return (
        <Card className='shadow-none p-4'>
            <CardHeader className='absolute flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    Your <span className='text-guppie-green'>playlist</span>
                </h3>
            </CardHeader>
            <CardBody className='px-3'>
                <Splide
                    hasTrack={false}
                    aria-label='Playlists'
                    options={{
                        perPage: 5,
                        rewind: true,
                        gap: '0.7rem',
                        pagination: false,
                        breakpoints: {
                            1024: { perPage: 4 },
                            768: { perPage: 3 },
                            480: { perPage: 2 },
                            320: { perPage: 1 },
                        },
                    }}
                >
                    <section className='pt-[4.5rem]'>
                        <SplideTrack>
                            {playlists.map((playlist, index) => (
                                <SplideSlide key={index}>
                                    <PlaylistCard playlist={playlist} />
                                </SplideSlide>
                            ))}
                        </SplideTrack>
                    </section>
                    <section className='hidden sm:flex absolute top-0 right-0 pt-6 z-10'>
                        <div className='w-[7.5rem] splide__arrows'>
                            <button className='splide__arrow splide__arrow--prev w-fit h-auto bg-transparent hover:bg-white/10 rounded-xl aspect-square'>
                                <FontAwesomeIcon icon={faArrowRight} className='text-xs text-white p-3' />
                            </button>
                            <button className='splide__arrow splide__arrow--next w-fit h-auto bg-transparent hover:bg-white/10 rounded-xl aspect-square'>
                                <FontAwesomeIcon icon={faArrowRight} className='text-xs text-white p-3' />
                            </button>
                        </div>
                    </section>
                </Splide>
            </CardBody>
        </Card>
    )
}
