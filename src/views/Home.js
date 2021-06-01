import React, { useEffect, useContext, useState } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import { Route, Switch } from 'react-router';
import CharactersGrid from '../components/CharactersGrid/CharactersGrid';
import Character from './Character';
import axios from 'axios'
import { StoreContext } from '../store/index'
import LoaderComponent from '../components/LoaderComponent/LoaderComponent';

export default function Home() {
    const [state, dispatch] = useContext(StoreContext)
    const [error, setError] = useState(false)
    const getData = () => {
        axios.get('/character')
        .then(res => dispatch({type: "SET_REQUEST_DATA", payload: res.data}))
        .catch(err => setError('error'))
    }
    useEffect(() => {
        getData();
    }, []);
    return(
        <>
            {
                state.requestInfo.results
                ?
                <div style={{display: 'flex', justifyContent: 'center', position: "relative"}}>
                        <CharactersGrid />
                        <Switch>
                              <Route path="/character/:id">
                                <Character />
                              </Route>
                        </Switch>
                </div>
                :
                <div style={{width: "100%", height: "100vh", position: "relative"}}>
                    <LoaderComponent />
                </div>
            }
        </>
    )
}
