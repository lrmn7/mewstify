import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, CircularProgress } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { TrackCard, TrackListCard } from '../ItemCards'

export function PlaylistTracks({ tracks }) {
    const [modeList, setModeList] = useState(true)

    const toggleModeList = () => {
        setModeList(!modeList)
    }

    return (
        <section className='w-full justify-between max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-16'>
            <Card className='shadow-none p-4'>
                <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                    <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                        Your <span className='text-guppie-green'>playlist</span>
                    </h3>
                    <div className='w-full flex flex-row justify-end items-center gap-3'>
                        <Button
                            isIconOnly
                            onClick={() => toggleModeList()}
                            variant='light'
                            showAnchorIcon
                        >
                            {modeList ? (
                                <FontAwesomeIcon icon={faList} />
                            ) : (
                                <FontAwesomeIcon icon={faTableCellsLarge} />
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className='px-3'>
                    {tracks.length === 0 && <CircularProgress className='self-center' color='success' />}

                    {!modeList ? (
                        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                            {tracks.map((track, index) => (
                                <TrackCard key={index} index={index + 1} track={track} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col gap-3'>
                            {tracks.map((track, index) => (
                                <TrackListCard key={index} index={index + 1} track={track} />
                            ))}
                        </div>
                    )}
                </CardBody>
            </Card>
        </section>
    )
}