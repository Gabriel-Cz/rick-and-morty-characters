import React, { lazy } from 'react'
import { 
  BrowserRouter as Router,
  Switch 
} from 'react-router-dom'
import RouteWithSubRoutes from '../router/RouteWithSubRoutes'
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

export default function RouterComponent() {
    return(
        <Switch>
            {routes.map(route => (
                <RouteWithSubRoutes key={route.path} {...route} />
            ))}
        </Switch>
    )
}