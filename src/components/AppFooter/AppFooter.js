import React, { useContext } from 'react'
import { StoreContext } from '../../store'
import { Loading } from '../../components/CharactersGrid/CharactersGrid'
import axios from 'axios'
import styles from './AppFooter.module.scss'

axios.defaults.baseURL = ''

const PrevButton = () => {
    const [state, dispatch] = useContext(StoreContext);
    const prevPage = () => {
        axios.get(state.requestInfo.info.prev)
        .then(res => {
            dispatch({type: "SET_REQUEST_INFO", payload: res.data})
        })
        .catch(err => {
            dispatch({type: "SET_ERROR", payload: err})
        })
    }
    return(
        <button onClick={() => prevPage()} className={styles.prevButton}>Anterior</button>
    )
}

const NextButton = () => {
    const [state, dispatch] = useContext(StoreContext)
    const nextPage = () => {
        axios.get(state.requestInfo.info.next)
        .then(res => {
            dispatch({type: "SET_REQUEST_INFO", payload: res.data})
        })
        .catch(err => {
            dispatch({type: "SET_ERROR", payload: err})
        })
    }
    return(
        <button onClick={() => nextPage()} className={styles.nextButton}>Siguiente</button>
    )
}

const SpanIndex = ({index}) => {
    const [state, dispatch] = useContext(StoreContext);
    const getIndexPage = () => {
        axios.get(`/character/?page=${index}`)
        .then(res => {
            dispatch({type: "SET_REQUEST_INFO", payload: res.data})
        })
        .catch(err => {
            dispatch({type: "SET_ERROR", payload: err})
        })
    }
    return(
        <span onClick={() => getIndexPage} >{index}</span>
    )
}

export default function AppFooter() {
    const [state] = useContext(StoreContext);
    return(
        <>
          <footer className={styles.footer}>
              <PrevButton />
              <div className={styles.pagesIndexWrapper}>
                  
              </div>
              <NextButton />
          </footer>
        </>
    )
}