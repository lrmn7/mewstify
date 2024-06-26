import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderArtist, InfoArtist, TopTracksById, RelatedArtists } from '../components'
import getArtistById from '../api/getArtistById'
import getTopTracksById from '../api/getTopTracksById'
import getRelatedArtistById from '../api/getRelatedArtistById'

export default function ArtistDetails() {
    const { id } = useParams()
    const [artist, setArtist] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [relatedArtists, setRelatedArtists] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const artist = await getArtistById(id)
            const topTracks = await getTopTracksById(id)
            const relatedArtists = await getRelatedArtistById(id)

            setArtist(artist)
            setTopTracks(topTracks)
            setRelatedArtists(relatedArtists)
        }
        
        fetchData()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [id])

    return (
        <main className='w-full min-h-screen flex flex-col items-center'>
            <HeaderArtist artist={artist} />
            <InfoArtist artist={artist} />
            <TopTracksById tracks={topTracks} />
            <RelatedArtists artists={relatedArtists} />
        </main>
    )
}
