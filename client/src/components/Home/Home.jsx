import useRoute from '../../Hooks/useRoute';
import Movies from '../Movies/Movies';
import { Helmet } from 'react-helmet';



export default function Home() {
  let { trendingMovies, trendingTv, trendingPersons } = useRoute();
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Movies page</title>
        <meta name='description' content='Home page to vies Trending Movies' />
      </Helmet>
      <div className='container'>
        <div className='row '>
          <div className='col-md-4 d-flex justify-content-center align-item-center flex-column'>
            <h2 className='h4 text-white'>All Trending <br />Movies To watch Now</h2>
            <h3 className='h6 text-white'>Best Movies for You</h3>
          </div>
          {trendingMovies.slice(0, 10).map((item, index) => <Movies key={index} item={item} />)}
        </div>
        <hr />
        <div className='row '>
          <div className='col-md-4 d-flex justify-content-center align-item-center flex-column'>
            <h2 className='h4 text-white'>All Trending Tv </h2>
          </div>
          {trendingTv.slice(0, 10).map((item, index) => <Movies key={index} item={item} />)}
        </div>
        <hr />
        <div className='row '>
          <div className='col-md-4 d-flex justify-content-center align-item-center flex-column'>
            <h2 className='h4 text-white'>All Trending <br />people</h2>
          </div>
          {trendingPersons.filter((el) => el.profile_path != null).slice(0, 10).map((item, index) => <Movies key={index} item={item} />)}
        </div>

      </div>
    </>
  )
}
