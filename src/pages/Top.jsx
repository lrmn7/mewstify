import { TimeRangeGroup, TopTabs } from '../components'

export default function Top() {
    return (
        <main className='w-full min-h-screen flex flex-col items-center p-6'>
            <div className='relative w-full flex flex-col max-w-5xl md:max-w-5xl xl:max-w-7xl gap-2 md:gap-4'>
                <div className='absolute right-0'>
                    <TimeRangeGroup />
                </div>
                <TopTabs />
            </div>
        </main>
    )
}
