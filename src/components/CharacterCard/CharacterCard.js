import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CharacterCard.module.scss'

export default function CharacterCard({id, image, name, gender, origin, type, status}) {
    return(
        <>
            <Link className="link" to={`/character/` + id}>
            <div className={styles.characterCard}>
                <div className={styles.characterImageColumn}>
                    <div>
                      <img width="100%" alt={name} src={image} />
                    </div>
                </div>
                <div className={styles['characterInformationColumn-' + status]}>
                    <span className={styles.characterName}>
                        <h2>{ name }</h2>        
                    </span>
                    <span className={styles.characterGender}>
                        <h4>Genero: <ins>{ gender }</ins></h4>        
                    </span>
                    <span className={styles.characterOrigin}>
                        <h4>Origen: <ins>{ origin }</ins></h4>        
                    </span>
                    <span className={styles.characterSpecie}>
                        <h4>Tipo: <ins>{ type }</ins></h4>        
                        </span>
                    <span className={styles['pill-' + status]}>
                        <ins>{ status }</ins>
                    </span>
                </div>
            </div>
        </Link>
        </>
    );
}