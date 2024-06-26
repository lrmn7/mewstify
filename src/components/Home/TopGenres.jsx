import { useState, useEffect } from 'react'
import { TopItemCard } from '../TopItemCard'
import { useTimeRange } from '../../hooks'
import getTopArtists from '../../api/getTopArtists'

export function TopGenres() {
    const { timeRange } = useTimeRange()
    const [topGenres, setTopGenres] = useState([])

    useEffect(() => {
        async function fetchTopArtists() {
            const response = await getTopArtists(timeRange, '50')
            getCountGenres(response)
        }

        fetchTopArtists(timeRange)
    }, [timeRange])

    const getCountGenres = (genres) => {
        const countGenres = []
        genres.forEach((artist) => {
            artist.genres.forEach((genre) => {
                const index = countGenres.findIndex((item) => item.name === genre)
                if (index !== -1) {
                    countGenres[index].count++
                }
                else {
                    countGenres.push({ name: genre, count: 1 })
                }
            })
        })

        getTopGenres(countGenres)
    }

    const getTopGenres = (genres) => {
        const topGenres = genres.sort((a, b) => b.count - a.count).slice(0, 5)
        setTopGenres(topGenres)
    }

    return (
        <TopItemCard title='Your Top Genres'>
            <div className='flex flex-col jus gap-1 z-10'>
                {topGenres.map((genre, index) => (
                    <div key={index} className='flex flex-row items-center gap-1'>
                        <span className='w-fit sm:w-10 flex-none text-2xl sm:text-5xl font-semibold text-end text-guppie-green mr-2 sm:mr-4'>{index + 1}.</span>
                        <span className='text-2xl sm:text-4xl font-semibold capitalize line-clamp-1'>{genre.name}</span>
                    </div>
                ))}
            </div>
        </TopItemCard>
    )
}
