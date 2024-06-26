import { CircularProgress, Progress } from '@nextui-org/react'
import { FeaturesChart } from './FeaturesChart'

function FeatureCard({ title, children }) {
    const isLoaded = children ? true : false

    return (
        <div className='flex flex-col col-span-1 bg-eerie-black rounded-2xl py-5 gap-1'>
            <span className='flex justify-center text-4xl text-guppie-green font-bold text-center'>
                {!isLoaded && <CircularProgress size='sm' color='success' className='mb-2' />}
                {children}
            </span>
            <p className='text-base text-foreground-500 font-semibold text-center'>
                {title}
            </p>
        </div>
    )
}

export function Features({ features }) {
    const isLoaded = Object.keys(features).length > 0

    return (
        <section className='w-full flex flex-col max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16 gap-8'>
            <h2 className='text-3xl font-bold'>Audio features</h2>
            <div className='flex flex-col lg:flex-row justify-between gap-8 sm:gap-16'>
                <div className='w-full grid grid-cols-2 gap-8'>
                    {!isLoaded && <CircularProgress size='sm' color='success' className='justify-self-center col-span-full mb-2' />}

                    {Object.keys(features).slice(0, 8).map((key, index) => (
                        <Progress
                            key={index}
                            size='sm'
                            radius='sm'
                            label={key}
                            maxValue={1}
                            color='success'
                            value={features[key] < 0 ? features[key] * -1 : features[key]}
                            className='col-span-1'
                            classNames={{
                                track: 'h-1.5',
                                label: 'capitalize',
                                indicator: 'bg-guppie-green',
                            }}
                        />
                    ))}
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 col-span-full gap-4 mt-8'>
                        <FeatureCard title='Loudness'>
                            {features.tempo && Math.round(features.loudness * 10) / 10}
                        </FeatureCard>
                        <FeatureCard title='Key'>
                            {features.key === 0 ? 'C' : features.key === 1 ? 'C#' : features.key === 2 ? 'D' : features.key === 3 ? 'D#' : features.key === 4 ? 'E' : features.key === 5 ? 'F' : features.key === 6 ? 'F#' : features.key === 7 ? 'G' : features.key === 8 ? 'G#' : features.key === 9 ? 'A' : features.key === 10 ? 'A#' : features.key === 11 ? 'B' : ''}
                        </FeatureCard>
                        <FeatureCard title='Mode'>
                            {features.mode === 1 ? 'Major' : features.mode === 0 ? 'Minor' : ''}
                        </FeatureCard>
                        <FeatureCard title='Time signature'>
                            {features.time && features.time + '/4'}
                        </FeatureCard>
                        <FeatureCard title='BPM'>
                            {features.tempo && Math.round(features.tempo * 10) / 10}
                        </FeatureCard>
                    </div>
                </div>
                <div className='w-full flex flex-col items-center'>
                    <FeaturesChart features={Object.values(features).slice(0, 2).concat(Object.values(features).slice(3, 8))} />
                </div>
            </div>
        </section>
    )
}