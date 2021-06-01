import React, { useContext } from 'react'
import { StoreContext } from '../../store'
import CharacterCard from '../CharacterCard/CharacterCard'
import LoaderComponent from '../LoaderComponent/LoaderComponent'
import styles from './CharactersGrid.module.scss'

export default function CharactersGrid() {
    const [state] = useContext(StoreContext);
    return(
        <>
          {
              state.requestInfo.results
              ?
        <div className={styles.charactersContainer}>
            <div className={styles.row}>
                {state.requestInfo.results.map(character => (
                    character.status !== 'unknown' 
                    ?
                    <div key={character.id}  className={styles.column}>
                        <CharacterCard id={character.id} image={character.image} name={character.name} gender={character.gender} origin={character.origin.name} type={character.type} status={character.status} />
                    </div>
                    : 
                    false
                ))}
            </div>
        </div>
        :
        <LoaderComponent />
                }
        </>
    )
}