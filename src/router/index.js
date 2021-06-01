import React from 'react'
import { lazy } from "react";
import Character from '../views/Character'
import Home from '../views/Home'

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        fallback: <div>Cargando...</div>,
        routes: [
            {
                path: '/character/:id',
                exact: false,
                component: Character,
                fallback: <div>Cargando...</div>
            }
        ]
    }
]