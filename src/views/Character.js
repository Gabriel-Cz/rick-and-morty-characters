import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import LoaderComponent from '../components/LoaderComponent/LoaderComponent';
import CharacterData from '../components/CharacterData/CharacterData'
import { StoreContext } from '../store/index'
import { useCharacterInfo } from '../utils/custom-hooks'
import axios from 'axios'
import styles from '../components/CharacterData/CharacterData.module.scss'

axios.defaults.baseURL = '';

const useGetCharacterData = async (id) => {
  const [dispatch] = useContext(StoreContext);
  let episodesArray = []
  let response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  try {
    response.data.episode.forEach(episode => {
      let episodeData = axios.get(episode);
      episodesArray.push(episodeData.data.name);
    })
    dispatch({type: "SET_CHARACTER", payload: response.data});
    dispatch({type: "SET_EPISODES", payload: episodesArray});
    return;
  } catch (error) {
    dispatch({type: "SET_ERROR", payload: error});
  }
  return;
} 

const useGetEpisodesData = async (urlsArray) => {
  const [dispatch] = useContext(StoreContext);
  let arrayEpisodesName = [];
  await urlsArray.forEach(episode => {
    axios.get(episode)
    .then(res => {
      arrayEpisodesName.push(res.name)
    })
    .catch(err => dispatch({type: "SET_ERROR", payload: err}))
  });
  return dispatch({type: "SET_EPISODES", payload: arrayEpisodesName});
}

const useGetRequestData = (characterId, episodeUrl) => {
  return axios.all([
    useGetCharacterData(characterId),
    useGetEpisodesData(episodeUrl)
  ])
}

export default function Character() {
    const [state] = useContext(StoreContext); 
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { results } = state.character;
    const { episodes } = state;
    useEffect(() => {
      setIsLoading(true) ;
      useGetCharacterData(id);
      setIsLoading(false);
      return;
    }, []);
    return(
      <>
      <div className={styles.characterViewContainer}>
        {
         isError && 
         <div> Ocurrio un error recarga la pagina.</div>
        }
        {
          isLoading 
          ?
          <LoaderComponent /> 
          :
          <CharacterData character={results} episodes={episodes} />
        }
      </div>
      </>
      
    )
}