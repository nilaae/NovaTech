import React, { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { useTheme } from '@mui/material'
import { useGetSalesQuery } from 'state/api'
import Loader from '../loader/Loader'

const monthMap = {
    January: "فروردین",
    February: "اردیبهشت",
    March: "خرداد",
    April: "تیر",
    May: "مرداد",
    June: "شهریور",
    July: "مهر",
    August: "آبان",
    September: "آذر",
    October: "دی",
    November: "بهمن",
    December: "اسفند",
}

const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme()
    const { data, isLoading } = useGetSalesQuery()
    const [totalSalesLine, totalUnitsLine] = useMemo(() => {
        if (!data) return []

        const { monthlyData } = data
        const totalSalesLine = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: []
        }
        const totalUnitsLine = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: []
        }

        Object.values(monthlyData).reduce((acc, { month, totalSales, totalUnits }) => {
            const currentSales = acc.sales + totalSales;
            const currentUnits = acc.units + totalUnits;

            totalSalesLine.data = [
                ...totalSalesLine.data,
                {
                    x: month,
                    y: currentSales
                }
            ];
            totalUnitsLine.data = [
                ...totalUnitsLine.data,
                {
                    x: month,
                    y: currentUnits
                }
            ];

            return { sales: currentSales, units: currentUnits }
        },
            { sales: 0, units: 0 }
        );

        return [[totalSalesLine], [totalUnitsLine]]
    }, [data, theme.palette.secondary])

    //eslint-disable-line react-hooks/exhaustive-deps

    if (!data || isLoading) return <Loader />

    return (
        <div style={{ direction: "ltr", width: "100%", height: "100%" }}>
            <ResponsiveLine
                data={view === "sales" ? totalSalesLine : totalUnitsLine}
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
                margin={{ top: 20, right: 50, bottom: 50, left: 100 }}
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
                enableArea={isDashboard}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: (v) => {
                        const month = monthMap[v] || v;

                        if (isDashboard) {
                            return month.substring(0, 3);
                        }

                        return month;
                    },
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? "" : "ماه",
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickValues: 5,
                    tickSize: 5,
                    tickPadding: 12,
                    tickRotation: 0,
                    legend: isDashboard ? '' : ` ${view === 'sales' ? "مجموع فروش سال" : "مجموع تعداد فروش"} `,
                    legendOffset: -80,
                    legendPosition: 'middle'
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
                    isDashboard ? [
                        // {
                        //     anchor: 'bottom-right',
                        //     direction: 'column',
                        //     justify: false,
                        //     translateX: 30,
                        //     translateY: -40,
                        //     itemsSpacing: 0,
                        //     itemDirection: 'left-to-right',
                        //     itemWidth: 80,
                        //     itemHeight: 20,
                        //     itemOpacity: 0.75,
                        //     symbolSize: 12,
                        //     symbolShape: 'circle',
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
                    ] : undefined
                }
            />
        </div>
    )
}

export default OverviewChart