import React, { useEffect, useState } from 'react'
import "./Home.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";


const apikey ="0afeb3849df9f06c9bdda1af76f209dd";
const url ="https://api.themoviedb.org/3";
const imgurl="https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowplaying="now_playing";
const Popular="popular";
const toprated="top_rated";


const Card=({ img })=>(
<img  className='card' src={img} alt="cover"/>
)

const Row= ({ title, arr=[] })=>(

  <div className='row'>
    <h2>{title}</h2>
<div>
         {   
    arr.map((item, index)=> (
<Card key={index} img={`${imgurl}/${item.poster_path}`}/>
    ))
    }
    </div>
  </div>
)
const Home = () => {

  const[upcomingmovie , setUpcomingmovie]= useState([])
  const[nowplayingmovie , setnowplayingmovie]= useState([])
  const[popularmovie , setpopularmovie]= useState([])
  const[topratedmovie , settopratedmovie]= useState([])
  const[genre , setGenre]= useState([])

  useEffect(() => {
      const fetchupcoming = async() => {
         const{data:{results}}= await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);           
      setUpcomingmovie(results);      
        };
 
        const fetchtoprated = async() => {
          const{data:{results}}= await axios.get(`${url}/movie/${toprated}?api_key=${apikey}`);           
       settopratedmovie(results);      
         };

         const fetchpopular = async() => {
          const{data:{results}}= await axios.get(`${url}/movie/${Popular}?api_key=${apikey}`);           
       setpopularmovie(results);      
         };

         const fetchnowplaying = async() => {
          const{data:{results}}= await axios.get(`${url}/movie/${nowplaying}?api_key=${apikey}&page=2`);           
       setnowplayingmovie(results);      
         };
         const fetchgeners = async() => {
          const{data:{genres}}= await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);           
       setGenre(genres);        
      };

      fetchupcoming();
      fetchnowplaying();
      fetchpopular();
      fetchtoprated();
      fetchgeners();
  },[])

  return (
  
    

    <section className='home'>
    <div className="banner" style={{
      backgroundImage: popularmovie[0] ? `url(${`${imgurl}/${popularmovie[0].poster_path}`})` : "rgba(16, 16, 16)"
    }}>
      
      {popularmovie[1] &&  <h1>{popularmovie[1].original_title}</h1>}
      {popularmovie[1] &&    <p>{popularmovie[1].overview}</p>}     
<div>
<button> <BiPlay/> Play  </button>
       <button> My List <AiOutlinePlus/> </button>
</div>
</div>     

    <Row title={"Upcoming Movies"} arr={upcomingmovie}/>  
    <Row title={"Now Playing"} arr={nowplayingmovie}/>
    <Row title={"Popular on Netflix"} arr={popularmovie}/>
    <Row title={"Top Rated Movies On Netflix"} arr={topratedmovie}/>

    <div className="genres">
      {genre.map((item)=>(
        <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
      ))}
    </div>
        </section>
    )
}

export default Home
