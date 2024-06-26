import { Image, Skeleton } from '@nextui-org/react'
import { SpotifyButton } from '../Button'

export function HeaderTrack({ track }) {
    const isLoaded = track.id ? true : false

    return (
        <header className='w-full flex items-center justify-center bg-eerie-black'>
            <div className='w-full flex flex-col sm:flex-row items-center max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-12 sm:py-16 gap-8'>
                <Skeleton isLoaded={isLoaded} className='rounded-2xl'>
                    <Image
                        isZoomed
                        width={250}
                        height={250}
                        alt={track.name}
                        src={track.image}
                    />
                </Skeleton>
                <div className='flex flex-col items-center sm:items-start justify-center gap-1'>
                    <Skeleton isLoaded={isLoaded} className='w-12 h-6 rounded-lg mb-2'>
                        <p className='text-foreground-500 font-medium bg-eerie-black capitalize'>
                            {track.albumType}
                        </p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-full h-9 rounded-lg'>
                        <h1 className='text-3xl sm:text-4xl font-bold bg-eerie-black line-clamp-1'>
                            {track.name}
                        </h1>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-[calc(100%_-_3rem)] h-6 rounded-lg'>
                        <div className='flex justify-center sm:justify-start bg-eerie-black'>
                            {track.artists &&
                                <span className='text-center md:text-left'>
                                    {track.artists.map((artist, index) => (
                                        <span key={index} className='text-base text-foreground-500 font-semibold'>
                                            <a>
                                                {artist.name}
                                            </a>
                                            {index < track.artists.length - 1 && (
                                                ', '
                                            )}
                                        </span>
                                    ))}
                                </span>
                            }
                        </div>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-fit h-12 rounded-2xl mt-12'>
                        <SpotifyButton url={track.url} isExternal>
                            Open in with Spotify
                        </SpotifyButton>
                    </Skeleton>
                </div>
            </div>
        </header>
    )
}