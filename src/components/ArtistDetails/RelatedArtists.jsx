import { CircularProgress } from '@nextui-org/react'
import { ArtistCard } from '../ItemCards'

export function RelatedArtists({ artists }) {
    return (
        <section className='w-full flex flex-col max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16 gap-8'>
            <h2 className='text-3xl font-bold'>Related artists</h2>

            {artists.length === 0 && <CircularProgress className='self-center' color='success' />}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-2 sm:gap-4'>
                {artists.slice(0, 10).map((artist, index) => (
                    <ArtistCard key={artist.id} index={index + 1} artist={artist} />
                ))}
            </div>
        </section>
    )
}