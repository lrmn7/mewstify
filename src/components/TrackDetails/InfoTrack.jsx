import { Skeleton } from '@nextui-org/react'

export function InfoTrack({ track }) {
    const isLoaded = track.id ? true : false

    const getTime = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        const time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds
        return time === 'NaN:NaN' ? null : time
    }

    return (
        <section className='w-full justify-between max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16'>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12'>
                <div className='flex flex-col items-center'>
                    {!isLoaded && <Skeleton className='w-1/3 h-10 rounded-xl mb-2' />}
                    <p className='text-lg md:text-3xl font-bold'>{track.popularity}</p>
                    <span className='text-base text-foreground-500 font-semibold'>Popularity (0-100)</span>
                </div>
                <div className='flex flex-col items-center'>
                    {!isLoaded && <Skeleton className='w-1/3 h-10 rounded-xl mb-2' />}
                    <p className='text-lg md:text-3xl font-bold'>{getTime(track.duration)}</p>
                    <span className='text-base text-foreground-500 font-semibold'>Duration</span>
                </div>
                <div className='flex flex-col items-center'>
                    {!isLoaded && <Skeleton className='w-1/3 h-10 rounded-xl mb-2' />}
                    <p className='text-lg md:text-3xl font-bold'>{track.releaseDate}</p>
                    <span className='text-base text-foreground-500 font-semibold'>Release date</span>
                </div>
                <div className='flex flex-col items-center'>
                    {!isLoaded && <Skeleton className='w-1/3 h-10 rounded-xl mb-2' />}
                    <p className='text-lg md:text-3xl font-bold'>{track.explicit ? 'Yes' : track.explicit === false ? 'No' : null}</p>
                    <span className='text-base text-foreground-500 font-semibold'>Explicit</span>
                </div>
            </div>
        </section>
    )
}