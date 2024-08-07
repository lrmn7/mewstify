import { SpotifyButton } from '../Button'
import { logIn } from '../../api/getAuth'

export function Footer() {
    return (
        <section className='w-full max-w-5xl md:max-w-5xl xl:max-w-7xl px-5 py-5 sm:px-0 sm:py-24'>
            <div className='items-center p-10 sm:p-16 text-center'>
                <h3 className='text-3xl sm:text-6xl font-bold text-center'>
                    Log in with <span className='text-guppie-green'>Spotify</span>
                </h3>
                <h3 className='text-3xl sm:text-6xl font-bold text-center'>
                    and get your <span className='text-guppie-green'>Music Stats</span>
                </h3>
                <span className='text-sm sm:text-lg text-foreground-500 text-center mt-5'>
                    Are you ready to get your music stats?
                </span>
                <br /> {/* Ini adalah tag <br> yang digunakan secara langsung */}
                <SpotifyButton onPress={logIn} classNames='mt-8'>
                    Log in with Spotify
                </SpotifyButton>
            </div>
            <div className='text-center mt-8'>
                <p className='text-sm sm:text-l text-foreground-400'>
                All copyrighted content (i.e. album artwork) on <span className='text-guppie-green'>Mewstify</span> are owned by their respective owners. Data is provided by Spotify AB. <span className='text-guppie-green'>Mewstify</span> is in no way affiliated with Spotify AB.
                </p>
            </div>
            <div className='text-center mt-4'>
                <p className='text-l sm:text-l text-foreground-500'>
                &copy; {new Date().getFullYear()} Made with ♥ in Bogor <br />
                </p>
            </div>
        </section>
    )
}
