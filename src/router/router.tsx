import { createBrowserRouter } from "react-router-dom"

import { Layout } from "@/components/layout/Layout"
import ErrorPage from "@/pages/Error/ErrorPage"
import HomePage from "@/pages/Home/HomePage"
import ProfilePage from "@/pages/Profile/ProfilePage"
import AuthPage from "@/pages/Auth/AuthPage"
import MapPage from "@/pages/Map/MapPage"
import HelperChanPage from "@/pages/Helper/HelperChanPage"
import {
    AUTH_ROUTE,
    CHAT_ROUTE,
    HOME_ROUTE,
    MAP_ROUTE,
    NOT_FOUND_ROUTE,
    PROFILE_ROUTE
} from "@/constants"

export const router = createBrowserRouter([
    {
        path: HOME_ROUTE,
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: PROFILE_ROUTE,
                element: <ProfilePage />
            },
            {
                path: AUTH_ROUTE,
                element: <AuthPage />
            },
            {
                path: MAP_ROUTE,
                element: <MapPage />
            },
            {
                path: CHAT_ROUTE,
                element: <HelperChanPage />
            },
        ]
    },
    {
        path: NOT_FOUND_ROUTE,
        element: <ErrorPage />
    }
])