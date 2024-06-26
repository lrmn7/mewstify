export function Background({ title }) {
    return (
        <div className='absolute hidden max-w-2xl lg:flex flex-col whitespace-nowrap right-0 z-0'>
            <div className='absolute w-full h-full bg-gradient-to-r from-eerie-black to-transparent z-10' />
            <span className='text-5xl sm:text-8xl font-bold text-transparent font-outline-1 -rotate-12'>{title}</span>
            <span className='text-5xl sm:text-8xl font-bold text-foreground -rotate-12'>{title}</span>
            <span className='text-5xl sm:text-8xl font-bold text-guppie-green -rotate-12'>{title}</span>
            <span className='text-5xl sm:text-8xl font-bold text-transparent font-outline-1 -rotate-12'>{title}</span>
        </div>
    )
}
