import { CircularProgress } from '@nextui-org/react'
import { TrackCard } from '../ItemCards'

export function RelatedTracks({ tracks }) {
    return (
        <section className='w-full flex flex-col max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16 gap-8'>
            <h2 className='text-3xl font-bold'>Recommendations</h2>

            {tracks.length === 0 && <CircularProgress className='self-center' color='success' />}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-2 sm:gap-4'>
                {tracks.map((track, index) => (
                    <TrackCard key={track.id} index={index + 1} track={track} />
                ))}
            </div>
        </section>
    )
}