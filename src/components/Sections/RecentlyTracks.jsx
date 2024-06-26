import { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CircularProgress, Select, SelectItem } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '../Button'
import { TrackCard, TrackListCard } from '../ItemCards'
import { limits } from '../../constants/lists'
import getRecentlyPlayed from '../../api/getRecentlyPlayed'

export function RecentlyTracks() {
    const [recentlyTracks, setRecentlyTracks] = useState([])
    const [modeList, setModeList] = useState(true)

    useEffect(() => {
        fetchRecentlyTracks()
    }, [])

    async function fetchRecentlyTracks(selectedLimit = 5) {
        const response = await getRecentlyPlayed(selectedLimit)
        setRecentlyTracks(response)
    }

    const getWhenWasPlayed = (playedAt) => {
        const playedAtDate = new Date(playedAt)
        const now = new Date()
        const diff = now - playedAtDate
        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const weeks = Math.floor(days / 7)
        const months = Math.floor(days / 30)
        const years = Math.floor(days / 365)
        var time = ''

        if (seconds < 60) {
            time = 'A few seconds ago'
        } else if (minutes < 60) {
            time = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
        } else if (hours < 24) {
            time = hours === 1 ? '1 hour ago' : `${hours} hours ago`
        } else if (days < 7) {
            time = days === 1 ? '1 day ago' : `${days} days ago`
        } else if (weeks < 4) {
            time = weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
        } else if (months < 12) {
            time = months === 1 ? '1 month ago' : `${months} months ago`
        } else {
            time = years === 1 ? '1 year ago' : `${years} years ago`
        }

        return time
    }

    const toggleModeList = () => {
        setModeList(!modeList)
    }

    return (
        <Card className='shadow-none p-4'>
            <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    Recently <span className='text-guppie-green'>Tracks</span>
                </h3>
                <div className='w-full flex flex-row justify-end items-center gap-3'>
                    <IconButton label='Toggle mode list' handleClick={() => toggleModeList()}>
                        {modeList ? (
                            <FontAwesomeIcon icon={faList} />
                        ) : (
                            <FontAwesomeIcon icon={faTableCellsLarge} />
                        )}
                    </IconButton>
                    <Select
                        label='Limit'
                        labelPlacement='inside'
                        className='max-w-[100px]'
                        disallowEmptySelection={true}
                        defaultSelectedKeys={[limits[0].value]}
                        onChange={(e) => {
                            fetchRecentlyTracks(e.target.value)
                        }}
                    >
                        {limits.map((limit) => (
                            <SelectItem key={limit.value} value={limit.value}>
                                {limit.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </CardHeader>
            <CardBody className='px-3'>
                {recentlyTracks.length === 0 && <CircularProgress className='self-center' color='success' />}

                {!modeList ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                        {recentlyTracks.map((track, index) => (
                            <TrackCard key={index} index={index + 1} track={track} />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {recentlyTracks.map((track, index) => (
                            <TrackListCard key={index} index={index + 1} track={track} chip={getWhenWasPlayed(track.playedAt)} />
                        ))}
                    </div>
                )}
            </CardBody>
        </Card >
    )
}
