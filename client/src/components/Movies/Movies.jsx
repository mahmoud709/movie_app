import React from 'react'
import { Link } from 'react-router-dom'

export default function Movies({ item }) {
  return (
    <div className='col-md-2 position-relative'>
      <Link to={`/details/${item.id}/${item.media_type}`}>
        {item.poster_path ? <img src={'https://image.tmdb.org/t/p/w500/' + item.poster_path} className='w-100 ' alt={item.title} />
          : <img src={'https://image.tmdb.org/t/p/w500/' + item.profile_path} className='w-100 ' alt={item.name} />
        }
        <p className='text-white py-2'>{item.title}{item.name}</p>
        {item.vote_average ? <span className='vote fw-bold text-white position-absolute top-0 p-2'>{item.vote_average?.toFixed(1)}</span> : ''}
      </Link>
    </div>
  )
}
