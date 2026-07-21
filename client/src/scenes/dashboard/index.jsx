import React from 'react'
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from '@mui/icons-material'
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import BreakdownChart from 'components/BreakdownChart'
import OverviewChart from 'components/OverviewChart'
import StatBox from 'components/StatBox'
import Header from 'components/Header'
import FlexBetween from 'components/FlexBetween'
import { useGetDashboardQuery } from 'state/api'

const Dashboard = () => {
    const theme = useTheme()
    const isNonMediumScreens = useMediaQuery("(min-width:1200px)")
    const { data, isLoading } = useGetDashboardQuery()
    const handleDownload = () => {
        if (!data) return;

        const report = [
            {
                "تعداد مشتریان": data.totalCustomers,
                "فروش امروز": data.todayStats.totalSales,
                "فروش ماه": data.thisMonthStats.totalSales,
                "فروش سال": data.yearlySalesTotal,
            }
        ]

        const worksheet = XLSX.utils.json_to_sheet(report);
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard")

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        })

        const file = new Blob(
            [excelBuffer],
            {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }
        )

        saveAs(file, "NovaTech_Report.xlsx");
    }

    const columns = [
        {
            field: "_id",
            headerName: "شناسه",
            flex: 1
        },
        {
            field: "userId",
            headerName: "شناسه کاربر",
            flex: 1
        },
        {
            field: "createdAt",
            headerName: "تاریخ",
            flex: 1,
            renderCell: (params) =>
                new Date(params.value).toLocaleDateString("fa-IR")
        },
        {
            field: "products",
            headerName: "تعداد محصولات",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "مبلغ",
            flex: 1,
            sortable: false,
            renderCell: (params) => `${Number(params.value).toLocaleString("fa-IR")} تومان`
        },
    ]
    return (
        <Box sx={{ m: "1.5rem", mx: "2.5rem" }}>
            <FlexBetween>
                <Header title="داشبورد" subtitle="خلاصه وضعیت فروشگاه" />
                <Box>
                    <Button
                        onClick={handleDownload}
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
                        }}
                    >
                        <DownloadOutlined sx={{ ml: "10px" }} />
                        دانلود گزارش
                    </Button>
                </Box>
            </FlexBetween>
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12,1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
                }}
            >
                <StatBox
                    title="تعداد مشتریان"
                    value={data && data.totalCustomers}
                    increase="+14%"
                    description="از ماه گذشته"
                    icon={
                        <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />

                <StatBox
                    title="فروش امروز"
                    value={data && data.todayStats.totalSales}
                    increase="+21%"
                    description="از ماه گذشته"
                    icon={
                        <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <OverviewChart view="sales" isDashboard={true} />
                </Box>
                <StatBox
                    title="فروش ماهانه"
                    value={data && data.thisMonthStats.totalSales}
                    increase="+5%"
                    description="از ماه گذشته"
                    icon={
                        <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />
                <StatBox
                    title="فروش سالانه"
                    value={data && data.yearlySalesTotal}
                    increase="+43%"
                    description="از ماه گذشته"
                    icon={
                        <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />
                <Box
                    gridColumn="span 8"
                    gridRow="span 3"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none"
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderBottom: "none"
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.primary.light
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderTop: "none"
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary[200]} !important`
                        }
                    }}
                >
                    <DataGrid
                        loading={isLoading || !data}
                        getRowId={(row) => row._id}
                        rows={(data && data.transactions) || []}
                        columns={columns}
                    />
                </Box>
                <Box
                    gridColumn='span 4'
                    gridRow='span 3'
                    background={theme.palette.background.alt}
                    p='1.5rem'
                    borderRadius='0.55rem'
                >
                    <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
                        فروش بر اساس دسته‌بندی
                    </Typography>
                    <BreakdownChart isDashboard={true} />
                    <Typography p='0 0.6rem' fontSize='0.8rem' sx={{ color: theme.palette.secondary[200] }}>
                        نمایش میزان فروش هر دسته از محصولات در سال جاری
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard