import React, { useEffect,useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import { Link } from 'react-router-dom'


const apiKey='4aa4a87b1a0b4338c702dd48f327f211'
const url='https://api.themoviedb.org/3'
const imgUrl='https://image.tmdb.org/t/p/original'
const upcoming='upcoming'
const nowPlaying='now_playing'
const popular='popular'
const topRated='top_rated'

const Card=({img})=>(
  <img  className="card" src={img} alt='cover'/>
)


const Row=({title,arr=[]})=>(
  <div className='row'>
  <h2>{title}</h2>
  <div>
    {
      arr.map((item,index)=>(
        <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
      ))
    }
  </div>
</div>
)
   

const Home = () => {
  const [upcomingMovies,setUpcomingMovies]=useState([])
  const [nowPlayingMovies,setNowPlayingMovies]=useState([])
  const [popularMovies,setPopularMovies]=useState([])
  const [topRatedMovies,setTopRatedMovies]=useState([])
  const [genre,setGenre]=useState([])
  
  useEffect(() => {
    const fetchUpcoming=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
      //console.log(results)
      setUpcomingMovies(results)
      //console.log(`upcomingMovies`,upcomingMovies)
    };


    const fetchNowPlaying=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
      setNowPlayingMovies(results)
    };

    const fetchPopular=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
      setPopularMovies(results)
    };


    const fetchTopRated=async()=>{
      const {data:{results}}=await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
      setTopRatedMovies(results)
    };

    const getAllGenre=async()=>{
      try{
        const {data:{genres}}=await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres)

     
      console.log(genre)
      }
      catch(e){
        console.log(e)
      }
      
    };


    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    getAllGenre();
  },[])
  

 
  
 
  return (
    <section  className='home'>
      <div className="banner"></div>
      <Row  title={"Upcoming Movies"}  arr={upcomingMovies}/>
      <Row  title={"Now Playing on Netflix"} arr={nowPlayingMovies}/>
      <Row  title={"Popular on Netflix"} arr={popularMovies}/>
      <Row  title={"Top Rated on Netflix"} arr={topRatedMovies}/>

      <div className="genreBox">
        {
          
          genre.map((item)=>(
            
            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
          ))
        }
      </div>
    </section>
  )
}

export default Home