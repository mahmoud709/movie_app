import axios from "axios";
import { useState, useEffect } from "react";

export default function useRoute() {
    const [trendingMovies, settrendingMovies] = useState([]);
    const [trendingPersons, settrendingPersons] = useState([]);
    const [trendingTv, settrendingTv] = useState([]);

    async function getMovies(mediaType, callback) {
        let { data } = await axios(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=157d654cfd866ed3c6ce5c5c5b2334a3`);
        callback(data.results)
    }
    useEffect(() => {
        getMovies('movie', settrendingMovies);
        getMovies('person', settrendingPersons);
        getMovies('tv', settrendingTv);
    }, []);
    return ({
        trendingMovies,
        trendingPersons,
        trendingTv
    }
    )
}