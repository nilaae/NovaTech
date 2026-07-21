import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { Box, useTheme, Typography } from '@mui/material'
import { useGetSalesQuery } from 'state/api'
import Loader from 'loader/Loader'

const BreakdownChart = ({ isDashboard = false }) => {
    const { data, isLoading } = useGetSalesQuery()
    const theme = useTheme()

    if (!data || isLoading) return <Loader />

    const categoryMap = {
        clothing: "کامپیوتر و لپ‌تاپ",
        accessories: "لوازم جانبی",
        misc: "متفرقه",
        shoes: "صوتی"
    }
    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],

    ]
    const formattedData = Object.entries(data.salesByCategory).map(([category, sales], i) => ({
        id: categoryMap[category] || category,
        label: categoryMap[category] || category,
        value: sales,
        color: colors[i]
    }))
    return (
        <Box
            sx={{ direction: "ltr" }}
            height={isDashboard ? "480px" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative"
            direction="ltr"
        >
            <div dir="ltr" style={{ width: "100%", height: "100%" }}>
                <ResponsivePie
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
                    colors={{ datum: "data.color" }}
                    margin={isDashboard ?
                        { top: 30, right: 40, bottom: 100, left: 40 }
                        :
                        { top: 40, right: 80, bottom: 130, left: 50 }
                    }
                    sortByValue={true}
                    innerRadius={0.45}
                    padAngle={0.7}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.2
                            ]
                        ]
                    }}
                    arcLinkLabel={!isDashboard}
                    arcLinkLabelsTextColor={theme.palette.secondary[200]}
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            justify: false,
                            translateX: isDashboard ? 20 : 0,
                            translateY: isDashboard ? 90 : 100,
                            itemsSpacing: 60,
                            itemWidth: 60,
                            itemHeight: 22,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: theme.palette.primary[500]
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
            <Box
                position="absolute"
                top="43%"
                left="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color={theme.palette.secondary[400]}
                textAlign="center"
                // pointerEvents="none"
                sx={{
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                }}
            >
                <Typography variant="h6">
                    {/* {!isDashboard && "Total:"}  */}
                    {data.yearlySalesTotal.toLocaleString("fa-IR")} تومان
                </Typography>
            </Box>
        </Box>
    )
}

export default BreakdownChart