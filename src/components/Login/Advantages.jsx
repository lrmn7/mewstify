import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { advantages } from '../../constants/landing'

export function Advantages() {
    return (
        <section className='flex flex-col md:flex-row justify-between gap-16 p-[12%] sm:p-[8%]'>
            <div className='w-full flex flex-1'>
                <div className='w-full'>
                    <h2 className='text-4xl sm:text-6xl font-bold'>
                        <span className='text-guppie-green'>Music</span> what you listen,
                        <br />
                        Stats what you <span className='text-guppie-green'>need</span>
                    </h2>
                    <p className='text-sm sm:text-lg text-foreground-500 mt-5'>
                        You just need to login with Spotify for
                    </p>
                    <p className='text-sm sm:text-lg text-foreground-500'>
                        get what you need to know about your music
                    </p>
                </div>
            </div>
            <div className='w-full flex flex-1 flex-col gap-8 md:gap-12'>
                {advantages.map((advantage, index) => (
                    <div key={index} className='w-full flex flex-row items-start gap-6'>
                        <div className='w-12 h-12 flex justify-center items-center bg-guppie-green/10 rounded-xl aspect-square'>
                            <FontAwesomeIcon className='w-5 h-5 text-guppie-green' icon={advantage.icon} />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h3 className='text-xl sm:text-3xl font-semibold'>
                                {advantage.title}
                            </h3>
                            <p className='text-sm sm:text-lg text-foreground-500'>
                                {advantage.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
