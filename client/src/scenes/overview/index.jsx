import React, { useState } from 'react'
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material'
import Header from 'components/Header'
import OverviewChart from 'components/OverviewChart'

const Overview = () => {
    const [view, setView] = useState("units")
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="نمای کلی" subtitle="نمایش کلی درآمد و فروش" />
            <Box height="75vh">
                <FormControl sx={{ mt: "1rem", minWidth: 180, direction: "rtl" }}>
                    <InputLabel>نمایش</InputLabel>
                    <Select
                        value={view}
                        label="نمایش"
                        onChange={(e) => setView(e.target.value)}
                    >
                        <MenuItem value="sales">فروش</MenuItem>
                        <MenuItem value="units">تعداد فروش</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    )
}
export default Overview