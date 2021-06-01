import React, { useState, useContext } from 'react'
import { StoreContext } from '../../store'
import axios from 'axios'
import styles from './AppHeader.module.scss'

const TopShape = () => {
    return(
        <div class={styles.topShapeWrapper}>
            <svg className={styles.curveSvg} viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M1200 120V112.77C1200 54.48 931.37 7.23 600 7.23C268.63 7.23 0 54.48 0 112.77V120L1200 120Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="1200" height="120" fill="white" transform="translate(1200 120) rotate(-180)"/>
</clipPath>
</defs>
</svg>

        </div>
    )
}

const SearchButton = ({searchInput}) => {
    const [state, dispatch] = useContext(StoreContext)
    const searchInApi = async (search) => {
        await axios.get(`/character/?name=${search}`)
        .then(res => {
            const charactersData = res.data
            dispatch({type: "SET_REQUEST_DATA", payload: charactersData})
        })
        .catch(() => {
            dispatch({type: "SET_ERROR", payload: "No pudimos encontrar el personaje. Intenta de nuevo." })
            setTimeout(() => {
                dispatch({type: "SET_ERROR", payload: false})
            }, 3000)
        })
    } 
    return(
        <button type="button" onClick={() => searchInApi(searchInput)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
    )
}

const SearchNavbar = () => {
    const [state] = useContext(StoreContext)
    const [input, setInput] = useState('');
    const handleInput = (event) => {
        setInput(event.target.value);
    }
    return(
        <>
        <nav class={styles.searchBar}>
            <input value={input} onChange={handleInput} />
            <SearchButton searchInput={input} />
        </nav>
        {
            state.error ?
            <small style={{color: 'red', marginTop: '20px'}}>{state.error}</small>
            :
            false
        }
        </>
    )
}

export default function AppHeader() {
    return(
        <>
          <header className={styles.header}>
              <div className={styles.divOverflow}></div>
              <TopShape />
              <div className={styles.searchBarWrapper}>
                 <h4>Rick and Morty <br/> Characters</h4>
                 <SearchNavbar />
              </div>
          </header>
        </>
    )
}