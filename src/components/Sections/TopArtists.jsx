import { useState, useEffect } from 'react'
import { useTimeRange } from '../../hooks/useTimeRange'
import { Card, CardHeader, CardBody, Select, SelectItem, CircularProgress } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '../Button'
import { ArtistCard, ArtistListCard } from '../ItemCards'
import { limits } from '../../constants/lists'
import getTopArtists from '../../api/getTopArtists'

export function TopArtists() {
    const { timeRange } = useTimeRange()
    const [modeList, setModeList] = useState(false)
    const [topArtists, setTopArtists] = useState([])
    const [limit, setLimit] = useState()

    useEffect(() => {
        async function fetchTopArtists() {
            const response = await getTopArtists(timeRange, limit)
            setTopArtists(response)
        }

        fetchTopArtists(limit)
    }, [timeRange, limit])

    const toggleModeList = () => {
        setModeList(!modeList)
    }

    return (
        <Card className='shadow-none p-4'>
            <CardHeader className='flex flex-col sm:flex-row justify-between gap-3'>
                <h3 className='w-full text-2xl sm:text-4xl font-bold'>
                    Top <span className='text-guppie-green'>Artists</span>
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
                {topArtists.length === 0 && <CircularProgress className='self-center' color='success' />}

                {!modeList ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
                        {topArtists.map((artist, index) => (
                            <ArtistCard key={index} index={index + 1} artist={artist} />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        {topArtists.map((artist, index) => (
                            <ArtistListCard key={index} index={index + 1} artist={artist} />
                        ))}
                    </div>
                )}
            </CardBody>
        </Card>
    )
}
