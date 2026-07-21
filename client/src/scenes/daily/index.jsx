import React, { useMemo, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { ResponsiveLine } from '@nivo/line'
import { useGetSalesQuery } from 'state/api'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import Loader from 'loader/Loader'
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const Daily = () => {
    const [startDate, setStartDate] = useState(new Date("2021-02-01"))
    const [endDate, setEndDate] = useState(new Date("2021-03-01"))

    const { data } = useGetSalesQuery()
    const theme = useTheme()

    const [formattedData] = useMemo(() => {
        if (!data) return []

        const { dailyData } = data
        const totalSalesLine = {
            id: "فروش",
            color: theme.palette.secondary.main,
            data: []
        }
        const totalUnitsLine = {
            id: "تعداد فروش",
            color: theme.palette.secondary[600],
            data: []
        }

        Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
            const dateFormatted = new Date(date)
            const start = new Date(startDate)
            const end = new Date(endDate)

            if (dateFormatted >= startDate && dateFormatted <= endDate) {
                const splitDate = new Date(date).toLocaleDateString("fa-IR", {
                    month: "2-digit",
                    day: "2-digit"
                })

                totalSalesLine.data = [
                    ...totalSalesLine.data,
                    { x: splitDate, y: totalSales }
                ];
                totalUnitsLine.data = [
                    ...totalUnitsLine.data,
                    { x: splitDate, y: totalUnits }
                ];

            }
        });
        const formattedData = [totalSalesLine, totalUnitsLine]
        return [formattedData]
    }, [data, theme.palette.secondary, endDate, startDate])
    //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="گزارش روزانه" subtitle="نمودار فروش و تعداد فروش روزانه" />
            <Box height="75vh">
                <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
                    <Box>
                        <DatePicker
                            value={startDate}
                            onChange={(date) => setStartDate(date.toDate())}
                            calendar={persian}
                            locale={persian_fa}
                        />
                    </Box>
                    <Box>
                        <DatePicker
                            value={endDate}
                            onChange={(date) => setEndDate(date.toDate())}
                            calendar={persian}
                            locale={persian_fa}
                        />
                    </Box>
                </Box>
                {
                    data ?
                        <ResponsiveLine
                            data={formattedData}
                            theme={{
                                axis: {
                                    domain: {
                                        line: {
                                            stroke: theme.palette.secondary[200]
                                        }
                                    },
                                    legend: {
                                        text: {
                                            fill: theme.palette.secondary[200]
                                        }
                                    },
                                    ticks: {
                                        line: {
                                            stroke: theme.palette.secondary[200],
                                            strokeWidth: 1
                                        },
                                        text: {
                                            fill: theme.palette.secondary[200]
                                        }
                                    }
                                },
                                legends: {
                                    text: {
                                        fill: theme.palette.secondary[200]
                                    }
                                },
                                tooltip: {
                                    container: {
                                        color: theme.palette.primary.main
                                    }
                                }
                            }}
                            color={{ datum: "color" }}
                            margin={{ top: 50, right: 60, bottom: 180, left: 70 }}
                            xScale={{ type: 'point' }}
                            yScale={{
                                type: 'linear',
                                min: 'auto',
                                max: 'auto',
                                stacked: false,
                                reverse: false
                            }}
                            yFormat=" >-.2f"
                            curve="catmullRom"
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                orient: 'bottom',
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 90,
                                legend: "تاریخ",
                                legendOffset: 60,
                                legendPosition: 'middle'
                            }}
                            axisLeft={{
                                orient: 'left',
                                tickSize: 5,
                                tickPadding: 25,
                                tickRotation: 0,
                                legend: "مقدار",
                                legendOffset: -50,
                                legendPosition: 'middle',
                                format: value => Number(value).toLocaleString("fa-IR")
                            }}
                            enableGridX={false}
                            enableGridY={false}
                            pointSize={10}
                            pointColor={{ theme: 'background' }}
                            pointBorderWidth={2}
                            pointBorderColor={{ from: 'serieColor' }}
                            pointLabelYOffset={-12}
                            useMesh={true}
                            legends={
                                [
                                    // {
                                    //     anchor: "top-right",
                                    //     direction: "column",
                                    //     translateX: -10,
                                    //     translateY: 130,
                                    //     itemWidth: 90,
                                    //     itemHeight: 20,
                                    //     itemsSpacing: 6,
                                    //     symbolSize: 12,
                                    //     symbolShape: "circle",
                                    //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                    //     effects: [
                                    //         {
                                    //             on: 'hover',
                                    //             style: {
                                    //                 itemBackground: 'rgba(0, 0, 0, .03)',
                                    //                 itemOpacity: 1
                                    //             }
                                    //         }
                                    //     ]
                                    // }
                                ]
                            }
                        /> : <Loader />
                }
            </Box>
        </Box>
    )
}

export default Daily;