import { Skeleton } from '@nextui-org/react'

export function InfoArtist({ artist }) {
    const isLoaded = artist.id ? true : false

    return (
        <section className='w-full justify-between max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16'>
            <div className='grid grid-cols-2 gap-8 sm:gap-12'>
                <div className='flex flex-col items-center'>
                    {!isLoaded && <Skeleton className='w-1/3 h-10 rounded-xl mb-2' />}
                    <p className='text-lg md:text-3xl font-bold'>{artist.popularity}</p>
                    <span className='text-base text-foreground-500 font-semibold'>Popularity (0-100)</span>
                </div>
                <div className='flex flex-col items-center'>
                    {!isLoaded && <Skeleton className='w-1/3 h-10 rounded-xl mb-2' />}
                    <p className='text-lg md:text-3xl font-bold capitalize'>
                        {artist.genres && artist.genres.length > 0 && artist.genres.slice(0, 2).join(', ')}
                        {artist.genres && artist.genres.length === 0 && 'No genres'}
                    </p>
                    <span className='text-base text-foreground-500 font-semibold'>Genres</span>
                </div>
            </div>
        </section>
    )
}