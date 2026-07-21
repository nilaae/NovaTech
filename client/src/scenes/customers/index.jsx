import React from "react"
import { useTheme, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetCustomersQuery } from 'state/api'
import Header from 'components/Header'

const Customers = () => {
    const theme = useTheme()
    const { isLoading, data } = useGetCustomersQuery()
    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "name",
            headerName: "نام",
            flex: 0.5
        },
        {
            field: "email",
            headerName: "ایمیل",
            flex: 1
        },
        {
            field: "phoneNumber",
            headerName: "شماره تماس",
            flex: 0.5,
            renderCell: ({ value, row }) => {
                const phone = String(value).replace(/\D/g, "");

                const countryCodes = {
                    IR: "+98",
                    US: "+1",
                    CA: "+1",
                    GB: "+44",
                    DE: "+49",
                    FR: "+33",
                    IT: "+39",
                    ES: "+34",
                    RU: "+7",
                    CN: "+86",
                    JP: "+81",
                    KR: "+82",
                    IN: "+91",
                    TR: "+90",
                    AE: "+971",
                    SA: "+966",
                    AU: "+61",
                    BR: "+55",
                    MX: "+52",
                };

                const code = countryCodes[row.country] || "+1";

                return (
                    <span dir="ltr">
                        {code} {phone}
                    </span>
                )
            }
        },
        {
            field: "country",
            headerName: "کشور",
            flex: 0.4
        },
        // {
        //     field: "occupation",
        //     headerName: "شغل",
        //     flex: 1
        // },
        {
            field: "role",
            headerName: "نقش",
            flex: 0.5
        },
    ]
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="مشتریان" subtitle="لیست مشتریان فروشگاه" />
            <Box
                mt="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        // direction: "rtl",
                        textAlign: "right",
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        // direction: "rtl",
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
                    rows={data || []}
                    columns={columns}
                    localeText={{
                        MuiTablePagination: {
                            labelRowsPerPage: "تعداد سطر:",
                        },
                    }}
                />
            </Box>
        </Box>
    )
}

export default Customers