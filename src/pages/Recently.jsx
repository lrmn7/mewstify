import { RecentlyTracks } from '../components'

export default function RecentlyPlayed() {
    return (
        <main className='w-full min-h-screen flex flex-col items-center p-6'>
            <div className='w-full max-w-5xl md:max-w-5xl xl:max-w-7xl gap-2 md:gap-4'>
                <RecentlyTracks />
            </div>
        </main>
    )
}
