import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Avatar, Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react'
import { TrackCard, TrackListCard, ArtistCard, PlaylistCard, ContainerCard } from '../components'
import getSearched from '../api/getSearched'

export default function SearchDetails() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchResults, setSearchResults] = useState([])
    const [tabSelected, setTabSelected] = useState('all')

    useEffect(() => {
        fetchSearch()
    }, [searchParams, tabSelected])

    async function fetchSearch() {
        try {
            const response = await getSearched(searchParams.get('query'), tabSelected)
            setSearchResults(response)
        } catch (error) {
            console.error('Error fetching search:', error)
        }
    }

    const clasNames = {
        tab: 'h-10',
        cursor: 'w-full bg-guppie-green/10 rounded-xl',
        tabContent: 'text-sm text-white font-medium group-data-[selected=true]:text-guppie-green',
    }

    return (
        <main className='min-h-screen flex flex-col items-center p-6'>
            <section className='w-full max-w-5xl md:max-w-5xl xl:max-w-7xl space-y-4'>
                <Tabs
                    color='success'
                    variant='light'
                    aria-label='Options'
                    classNames={clasNames}
                    selectedKey={tabSelected}
                    onSelectionChange={setTabSelected}
                >
                    <Tab key='all' title='All'>
                        <div className='grid grid-cols-12 shadow-none gap-4'>
                            <Card className='col-span-full md:col-span-4 shadow-none p-4'>
                                <CardHeader className='px-3'>
                                    <h3 className='text-3xl font-semibold'>Main result</h3>
                                </CardHeader>
                                <CardBody className='justify-start md:justify-end gap-6 p-3 pt-5'>
                                    {searchResults.artists && (
                                        <Avatar
                                            src={searchResults.artists[0].image}
                                            size='large'
                                            className='w-32 h-32 md:w-46 md:h-46 lg:w-52 lg:h-52 object-cover aspect-square'
                                        />
                                    )}
                                    <div className='flex flex-col'>
                                        <h4 className='text-3xl font-bold line-clamp-1'>
                                            {searchResults.artists && searchResults.artists[0].name}
                                        </h4>
                                        <span className='text-base text-foreground-500 font-medium'>
                                            Artist
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className='col-span-full md:col-span-8 shadow-none p-4'>
                                <CardHeader className='px-3'>
                                    <h3 className='text-3xl font-semibold'>Tracks</h3>
                                </CardHeader>
                                <CardBody className='gap-2 p-3'>
                                    {searchResults.tracks && (
                                        searchResults.tracks.slice(0, 3).map((track, index) => (
                                            <TrackListCard key={index} track={track} />
                                        ))
                                    )}
                                </CardBody>
                            </Card>
                            <Card className='col-span-full shadow-none p-4'>
                                <CardHeader className='px-3'>
                                    <h3 className='text-3xl font-semibold'>Artist</h3>
                                </CardHeader>
                                <CardBody className='gap-2 p-3'>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4'>
                                        {searchResults.artists && (
                                            searchResults.artists.slice(0, 7).map((artist, index) => (
                                                <ArtistCard key={index} artist={artist} />
                                            ))
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className='col-span-full shadow-none p-4'>
                                <CardHeader className='px-3'>
                                    <h3 className='text-3xl font-semibold'>Albums</h3>
                                </CardHeader>
                                <CardBody className='gap-2 p-3'>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4'>
                                        {searchResults.albums && (
                                            searchResults.albums.slice(0, 7).map((album, index) => (
                                                <TrackCard key={index} track={album} />
                                            ))
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className='col-span-full shadow-none p-4'>
                                <CardHeader className='px-3'>
                                    <h3 className='text-3xl font-semibold'>Playlists</h3>
                                </CardHeader>
                                <CardBody className='gap-2 p-3'>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4'>
                                        {searchResults.playlists && (
                                            searchResults.playlists.slice(0, 7).map((playlist, index) => (
                                                <PlaylistCard key={index} playlist={playlist} />
                                            ))
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Tab>
                    <Tab key='track' title='Tracks' >
                        <ContainerCard title='Tracks'>
                            {searchResults.tracks && (
                                searchResults.tracks.map((track, index) => (
                                    <TrackCard key={index} track={track} />
                                ))
                            )}
                        </ContainerCard>
                    </Tab>
                    <Tab key='album' title='Albums'>
                        <ContainerCard title='Albums'>
                            {searchResults.albums && (
                                searchResults.albums.map((album, index) => (
                                    <TrackCard key={index} track={album} />
                                ))
                            )}
                        </ContainerCard>
                    </Tab>
                    <Tab key='artist' title='Artists'>
                        <ContainerCard title='Artists'>
                            {searchResults.artists && (
                                searchResults.artists.map((artist, index) => (
                                    <ArtistCard key={index} artist={artist} />
                                ))
                            )}
                        </ContainerCard>
                    </Tab>
                    <Tab key='playlist' title='Playlists'>
                        <ContainerCard title='Playlists'>
                            {searchResults.playlists && (
                                searchResults.playlists.map((playlist, index) => (
                                    <PlaylistCard key={index} playlist={playlist} />
                                ))
                            )}
                        </ContainerCard>
                    </Tab>
                </Tabs>
            </section>
        </main>
    )
}
