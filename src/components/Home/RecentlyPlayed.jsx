import { useState, useEffect } from 'react'
import { Card, CardBody, Image, Button, Progress, CircularProgress, Chip } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons'
import getRecentlyPlayed from '../../api/getRecentlyPlayed'

export function RecentlyPlayed() {
    const [recentlyPlayed, setRecentlyPlayed] = useState([])

    useEffect(() => {
        const pollRecentlyPlayed = async () => {
            const response = await getRecentlyPlayed()

            if (response !== null) {
                setRecentlyPlayed(response[0])
            }

            setTimeout(pollRecentlyPlayed, 10000)
        }

        pollRecentlyPlayed()
    }, [])

    const getDuration = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }

    return (
        <Card className='shadow-none'>
            <CardBody>
                <div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
                    <div className='flex justify-center col-span-6 md:col-span-4 aspect-square'>
                        {recentlyPlayed.image === undefined
                            ? <CircularProgress color='success' />
                            : <Image
                                isZoomed
                                width='100%'
                                height={200}
                                alt={recentlyPlayed.name}
                                src={recentlyPlayed.image}
                                className='object-cover aspect-square'
                            />
                        }
                    </div>

                    <div className='flex flex-col col-span-6 md:col-span-8'>
                        <div className='flex justify-between items-start'>
                            <div className='flex flex-col gap-0'>
                                <Chip
                                    startContent={<FontAwesomeIcon icon={faClock} />}
                                    variant='flat'
                                    color='success'
                                    className='font-medium pl-2'
                                >
                                    Recently played
                                </Chip>
                                <span className='text-large font-medium line-clamp-1 mt-2'>{recentlyPlayed.name}</span>
                                <span className='text-small text-foreground/80 line-clamp-1'>{recentlyPlayed.artists}</span>
                            </div>
                            <Button
                                isIconOnly
                                radius='full'
                                variant='light'
                                aria-label='Like'
                                className='text-foreground-500 hover:bg-foreground-100 -translate-y-2 translate-x-2'
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </Button>
                        </div>

                        <div className='flex flex-col mt-3 gap-1'>
                            <Progress
                                aria-label='Music progress'
                                classNames={{
                                    indicator: 'bg-default-800 dark:bg-white',
                                    track: 'bg-default-500/30',
                                }}
                                color='default'
                                size='sm'
                                value={100}
                            />
                            <div className='flex justify-between'>
                                <p className='text-small'>{getDuration(recentlyPlayed.durationMs)}</p>
                                <p className='text-small text-foreground/50'>{getDuration(recentlyPlayed.durationMs)}</p>
                            </div>
                        </div>

                        <div className='flex w-full items-center justify-center'>
                            <Button
                                radius='full'
                                variant='light'
                                startContent={<FontAwesomeIcon icon={faPlay} />}
                                className={`hover:bg-foreground/10 ${recentlyPlayed.previewUrl ? '' : 'invisible'}`}
                            >
                                Play preview
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
