import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const useCharacterInfo = () => {
    const [characterData, setCharacterData] = useState();
    const [characterUrl, setCharacterUrl] = useState('');
    const [episodesArray, setEpisodesArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const getData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const characterResponse = await axios.get(characterUrl);
                console.log(characterResponse.data);
                setCharacterData(characterResponse.data);
                const episodesResponse = characterResponse.data.episode.forEach(episode => {
                    let episodesName = []
                    axios.get(episode)
                    .then(res => episodesName.push(res.data.name))
                    .catch(err => console.log(err))
                    return episodesName;
                })
                setEpisodesArray(episodesResponse);
            } catch (error) {
                console.log(error);
                setIsError(true);
            }
            setIsLoading(false);
        }
        getData();
    }, [characterUrl]);
    return[{ characterData, episodesArray, isLoading, isError }, setCharacterUrl]
}

