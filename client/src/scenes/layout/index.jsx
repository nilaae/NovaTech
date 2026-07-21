import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import { useGetUserQuery } from 'state/api'

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const userId = useSelector((state) => state.global.userId)

    const { data } = useGetUserQuery(userId)
    // console.log(data)
    return (
        <Box
            display="flex"
            flexDirection="row-reverse"
            width="100%"
            minHeight="100vh"
        >
            <Sidebar
                user={data || {}}
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar
                    user={data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout