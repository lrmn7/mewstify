import { Image, Skeleton } from '@nextui-org/react'
import { SpotifyButton } from '../Button'

export function HeaderPlaylist({ playlist }) {
    const isLoaded = playlist.id ? true : false

    return (
        <header className='w-full flex items-center justify-center bg-eerie-black'>
            <div className='w-full flex flex-col sm:flex-row items-center max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-12 sm:py-16 gap-8'>
                <Skeleton isLoaded={isLoaded} className='rounded-2xl'>
                    <Image
                        isZoomed
                        width={250}
                        height={250}
                        alt={playlist.name}
                        src={playlist.image}
                    />
                </Skeleton>
                <div className='flex flex-col items-center sm:items-start justify-center gap-1'>
                    <Skeleton isLoaded={isLoaded} className='w-[calc(100%_-_5rem)] h-6 rounded-lg mb-2'>
                        <p className='text-foreground-500 font-medium bg-eerie-black capitalize'>
                            {playlist.collaborative ? 'Collaborative' : 'Personal'} {playlist.type}
                        </p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-full h-9 rounded-lg'>
                        <h1 className='text-3xl sm:text-4xl font-bold bg-eerie-black line-clamp-1'>
                            {playlist.name}
                        </h1>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-[calc(100%_-_8rem)] h-6 rounded-lg'>
                        <p className='text-foreground-500 font-medium bg-eerie-black capitalize'>
                            {playlist.totalTracks && playlist.totalTracks + ' tracks'}
                        </p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-fit h-12 rounded-2xl mt-12'>
                        <SpotifyButton url={playlist.url} isExternal>
                            Open in with Spotify
                        </SpotifyButton>
                    </Skeleton>
                </div>
            </div>
        </header>
    )
}