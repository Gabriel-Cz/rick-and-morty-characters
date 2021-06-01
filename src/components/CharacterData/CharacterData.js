import React, { useEffect, useState, useContext } from 'react'
import { StoreContext } from '../../store'
import CharacterCard from '../CharacterCard/CharacterCard'
import { Link } from 'react-router-dom'
import styles from './CharacterData.module.scss'
import LoaderComponent from '../LoaderComponent/LoaderComponent'

const CharacterContainerFooter = () => {
  return(
    <>
      <div className={styles.characterContainerFooter}>
        <Link to="/">
          <button className={styles.goBackButton}>Regresar</button>
        </Link>
      </div>
    </>
  )
} 

const EpisodesLists = ({episodes}) => {
  return(
    <div>
      <ul>
        <h1>Episodios en donde aparece este personaje</h1>
        {episodes.map(episode => (
          <li>{episode}</li>
          ))}
      </ul>
    </div>
  )
}

export default function CharacterData({ character, episodes}) {
  const episodesArray = episodes;
  const characterObject = character;
  return(
    <>
      {
        episodesArray || characterObject === undefined
        ?
        <LoaderComponent />
        :
        <>
          <div className={styles.characterContainer}>
            <CharacterCard name={characterObject.name} image={characterObject.image} gender={characterObject.gender} type={characterObject.type} status={characterObject.status}  />
          </div>
          <div className={styles.episodesContainer}>
            <EpisodesLists episodes={episodesArray} />
          </div>
          <CharacterContainerFooter />
        </>
      }
    </>
  )
}