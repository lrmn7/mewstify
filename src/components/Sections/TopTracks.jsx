import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { Card, CardHeader, CardBody, Select, SelectItem, CircularProgress } from '@nextui-org/react'
import { IconButton } from '../Button'
import { TrackCard, TrackListCard } from '../ItemCards'
import { useTimeRange } from '../../hooks'
import { limits } from '../../constants/lists'
import getTopTracks from '../../api/getTopTracks'

export function TopTracks() {
    const { timeRange } = useTimeRange()
    const [modeList, setModeList] = useState(false)
    const [topTracks, setTopTracks] = useState([])
    const [limit, setLimit] = useState()

    useEffect(() => {
        async function fetchTopTracks() {
            const response = await getTopTracks(timeRange, limit)
            setTopTracks(response)
        }

        fetchTopTracks(limit)
    }, [timeRange, limit])

    const toggleModeList = () => {
        setModeList(!modeList)
    }

    return (
        <Card className='shadow-none p-4'>
            <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    Top <span className='text-guppie-green'>Tracks</span>
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
                        defaultSelectedKeys={[limits[0].value]}
                        disallowEmptySelection={true}
                        onChange={(e) => {
                            const selected = e.target.value
                            setLimit(selected)
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
                {topTracks.length === 0 && <CircularProgress className='self-center' color='success' />}

                {!modeList ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                        {topTracks.map((track, index) => (
                            <TrackCard key={index} index={index + 1} track={track} />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {topTracks.map((track, index) => (
                            <TrackListCard key={index} index={index + 1} track={track} />
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    )
}
