import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HeaderTrack, InfoTrack, Features, RelatedTracks } from '../components'
import getTrackById from '../api/getTrackById'
import getFeaturesById from '../api/getFeaturesById'
import getRelatedTracksById from '../api/getRelatedTracksById'

export default function TrackDetails() {
    const { id } = useParams()
    const [track, setTrack] = useState([])
    const [features, setFeatures] = useState([])
    const [relatedTracks, setRelatedTracks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const track = await getTrackById(id)
            const features = await getFeaturesById(id)
            const relatedTracks = await getRelatedTracksById(track.artists[0].id, id)

            setTrack(track)
            setFeatures(features)
            setRelatedTracks(relatedTracks)
        }

        fetchData()

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [id])

    return (
        <main className='w-full min-h-screen flex flex-col items-center'>
            <HeaderTrack track={track} />
            <InfoTrack track={track} />
            <Features features={features} />
            <RelatedTracks tracks={relatedTracks} />
        </main>
    )
}
