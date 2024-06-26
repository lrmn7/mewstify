import { Avatar, Skeleton } from '@nextui-org/react'
import { SpotifyButton } from '../Button'

export function HeaderArtist({ artist }) {
    const isLoaded = artist.id ? true : false

    return (
        <header className='w-full flex items-center justify-center bg-eerie-black'>
            <div className='w-full flex flex-col sm:flex-row items-center max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-12 sm:py-16 gap-8'>
                <Skeleton isLoaded={isLoaded} className='rounded-full'>
                    <Avatar
                        showFallback
                        alt={artist.name}
                        src={artist.image}
                        className='w-64 h-64'
                    />
                </Skeleton>
                <div className='flex flex-col items-center sm:items-start justify-center gap-1'>
                    <Skeleton isLoaded={isLoaded} className='w-12 h-6 rounded-lg mb-2'>
                        <p className='flex justify-center sm:justify-start text-foreground-500 font-medium bg-eerie-black capitalize'>
                            {artist.type}
                        </p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-full h-9 rounded-lg'>
                        <h1 className='flex justify-center sm:justify-start text-3xl sm:text-4xl font-bold bg-eerie-black line-clamp-1'>
                            {artist.name}
                        </h1>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-[calc(100%_-_2rem)] h-6 rounded-lg'>
                        <p className='flex justify-center sm:justify-start text-lg text-foreground-500 font-medium bg-eerie-black'>
                            {artist.followers && artist.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} followers
                        </p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className='w-fit h-12 rounded-2xl mt-12'>
                        <SpotifyButton url={artist.url} isExternal>
                            Open in with Spotify
                        </SpotifyButton>
                    </Skeleton>
                </div>
            </div>
        </header>
    )
}