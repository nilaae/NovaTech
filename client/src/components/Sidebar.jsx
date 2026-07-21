import React, { useState, useEffect } from 'react'
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material'

import {
    ChevronLeft,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import ProfileImage from 'assets/profile.jpeg'

const navItems = [
    {
        text: "داشبورد",
        path: "dashboard",
        icon: <HomeOutlined />
    },

    {
        text: "مدیریت فروش",
        icon: null
    },

    {
        text: "محصولات",
        path: "products",
        icon: <ShoppingCartOutlined />
    },

    {
        text: "مشتریان",
        path: "customers",
        icon: <Groups2Outlined />
    },

    {
        text: "سفارش‌ها",
        path: "transactions",
        icon: <ReceiptLongOutlined />
    },

    {
        text: "موقعیت جغرافیایی",
        path: "geography",
        icon: <PublicOutlined />
    },

    {
        text: "گزارش‌ها",
        icon: null
    },

    {
        text: "نمای کلی",
        path: "overview",
        icon: <PointOfSaleOutlined />
    },

    {
        text: "گزارش روزانه",
        path: "daily",
        icon: <TodayOutlined />
    },

    {
        text: "گزارش ماهانه",
        path: "monthly",
        icon: <CalendarMonthOutlined />
    },

    {
        text: "تحلیل فروش",
        path: "breakdown",
        icon: <PieChartOutlined />
    },

    {
        text: "مدیریت",
        icon: null
    },

    {
        text: "مدیران",
        path: "admin",
        icon: <AdminPanelSettingsOutlined />
    },

    {
        text: "عملکرد",
        path: "performance",
        icon: <TrendingUpOutlined />
    }
];

const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const { pathname } = useLocation()
    const [active, setActive] = useState("")
    const navigate = useNavigate()
    const theme = useTheme()

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])

    return (
        <Box component="nav">
            {
                isSidebarOpen && (
                    <Drawer
                        open={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        variant="persistent"
                        anchor="right"
                        sx={{
                            width: drawerWidth,
                            "& .MuiDrawer-paper": {
                                color: theme.palette.secondary[200],
                                backgroundColor: theme.palette.background.alt,
                                boxSizing: "border-box",
                                borderWidth: isNonMobile ? 0 : "2px",
                                width: drawerWidth
                            }
                        }}
                    >
                        <Box width="100%">
                            <Box m="1.5rem 0.5rem 2rem 3rem">
                                <FlexBetween color={theme.palette.secondary.main}>
                                    <Box display="flex" alignItems="center" gap="0.5rem">
                                        <Typography variant="h4" fontWeight="bold">
                                            NovaTech
                                        </Typography>
                                    </Box>
                                    {!isNonMobile && (
                                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <ChevronLeft />
                                        </IconButton>
                                    )
                                    }
                                </FlexBetween>
                            </Box>
                            <List>
                                {
                                    navItems.map(({ text, icon, path }) => {
                                        if (!icon) {
                                            return (
                                                <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                                    {text}
                                                </Typography>
                                            )
                                        }

                                        return (
                                            <ListItem key={text} disablePadding>
                                                <ListItemButton onClick={() => {
                                                    navigate(`/${path}`)
                                                    setActive(path)
                                                }}
                                                    sx={{
                                                        backgroundColor: active === path ? theme.palette.secondary[300] : "transparent",
                                                        color:
                                                            active === path
                                                                ? theme.palette.primary[600]
                                                                : theme.palette.secondary[100]
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            mr: "0.4rem",
                                                            minWidth: "auto",
                                                            color:
                                                                active === path
                                                                    ? theme.palette.primary[600]
                                                                    : theme.palette.secondary[200]
                                                        }}
                                                    >
                                                        {icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={text} />
                                                    {active === path && (
                                                        <ChevronLeft sx={{ ml: "auto" }} />
                                                    )}
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </Box>
                        <Box position="relative" bottom="0.5rem">
                            <Divider />
                            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                                <Box
                                    component="img"
                                    alt="profile"
                                    src={ProfileImage}
                                    height="40px"
                                    width="40px"
                                    borderRadius="50%"
                                    sx={{ objectFit: "cover" }}
                                />
                                <Box textAlign="left">
                                    <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>{user.name}</Typography>
                                    <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>{user.occupation}</Typography>
                                </Box>
                                {/* <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} /> */}
                            </FlexBetween>
                        </Box>
                    </Drawer>
                )}
        </Box>
    )
}

export default Sidebar