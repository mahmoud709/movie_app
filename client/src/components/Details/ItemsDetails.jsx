import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ItemsDetails() {
    const { id, type } = useParams();
    const [itemDetails, setItemDetails] = useState({})
    async function getItemDetails(id, type) {
        let { data } = await axios(`https://api.themoviedb.org/3/${type}/${id}?api_key=157d654cfd866ed3c6ce5c5c5b2334a3`);
        setItemDetails(data);
    }
    useEffect(() => {
        getItemDetails(id, type)
    }, [])
    return (
        <div className='container text-white'>
            <div className="row">
                <div className='posterImage col-md-3'>
                    {itemDetails.poster_path ? <img src={`https://image.tmdb.org/t/p/w500/${itemDetails.poster_path}`} className='w-100' alt='PosterImage' />
                        : <img src={`https://image.tmdb.org/t/p/w500/${itemDetails.profile_path}`} className='w-100' alt='ProfileImage' />}
                </div>
                <div className='textDetails col-md-6'>
                    <h3 className='h5 py-3'>{itemDetails.original_title}{itemDetails.name}</h3>
                    <p>{itemDetails.overview}{itemDetails.biography}</p>
                    {itemDetails.vote_average ? <p>vote Average : {itemDetails.vote_average.toFixed(1)}</p> : ''}
                    {itemDetails.vote_count ? <p>vote Count : {itemDetails.vote_count}</p> : ''}
                    {(itemDetails.release_date || itemDetails.birthday) ? <span>Date :{itemDetails.release_date}{itemDetails.birthday}</span> : ''}
                </div>
            </div>
        </div>
    )
}
