import { SpotifyButton } from '../Button'
import { logIn } from '../../api/getAuth'

export function Landing() {
    return (
        <section className='w-full max-w-5xl md:max-w-5xl xl:max-w-7xl px-5 py-5 sm:px-0 sm:py-24 justify-center'>
            <div className='p-10 text-center'>
                <h1 className='text-4xl sm:text-7xl font-bold'>
                    Explore Your <span className='text-guppie-green'>Spotify Stats</span> and Uncover Your Music Insights
                </h1>
                <p className='text-sm sm:text-lg text-foreground-500 mt-2 hidden sm:block'>
                    Discover your top artists and songs on Spotify
                </p>
                <p className='text-xxl sm:text-lg text-foreground-500 hidden sm:block'>
                    and enjoy your stats with beautiful visuals
                </p>
                <SpotifyButton
                    classNames='mt-2'
                    onPress={logIn}
                >
                    Log in with Spotify
                </SpotifyButton>
            </div>
        </section>
    )
}
