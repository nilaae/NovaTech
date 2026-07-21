import React, { useState } from 'react'
import { useGetProductsQuery } from 'state/api'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery
} from '@mui/material'
import Header from 'components/Header'
import Loader from 'loader/Loader'
import SearchIcon from "@mui/icons-material/Search"
import { InputBase, IconButton } from "@mui/material"
import { productNameMap, productDescriptionMap } from 'data/productTranslations'

const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
}) => {
    const theme = useTheme()
    const [isExpanded, setIsExpanded] = useState(false)
    
    return (
        <Card
            sx={{
                direction: "rtl",
                textAlign: "right",
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem"
            }}
        >
            <CardContent
                sx={{
                    direction: "rtl",
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                }}
            >
                <Typography sx={{ fontSize: "14px", color: theme.palette.secondary[700] }} gutterBottom>
                    {category}
                    {/* {categoryMap[category] || category} */}
                </Typography>
                <Typography variant="h5" component="div"> {productNameMap[name] || name}</Typography>
                <Typography sx={{ mb: "1.5rem", color: theme.palette.secondary[400] }} >
                    {Number(price).toLocaleString("fa-IR")} تومان
                </Typography>
                <Box dir="ltr" display="inline-flex">
                    <Rating value={rating} readOnly />
                </Box>
                <Typography variant="body2">{productDescriptionMap[name] || description}</Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small"
                    onClick={() => setIsExpanded(!isExpanded)}>
                    مشاهده جزئیات
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeOut="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.neutral[300]
                }}
            >
                <CardContent sx={{
                    direction: "rtl",
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 1,
                }}>
                    <Typography>id: {_id}</Typography>
                    <Typography>موجودی: {Number(supply).toLocaleString("fa-IR")}</Typography>
                    <Typography>فروش سال جاری: {" "}
                        {Number(stat.yearlySalesTotal).toLocaleString("fa-IR")}</Typography>
                    <Typography>تعداد فروش سال جاری: {" "}
                        {Number(stat.yearlyTotalSoldUnits).toLocaleString("fa-IR")}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Products = () => {
    const { data, isLoading, error } = useGetProductsQuery()
    const isNonMobile = useMediaQuery("(min-width:1000px)")
    const theme = useTheme()

    const [search, setSearch] = useState("")

    const filteredProducts = (data || []).filter((product) => {
        const productName =
            productNameMap[product.name] || product.name

        return productName
            .toLowerCase()
            .includes(search.toLowerCase())
    })

    return (
        <Box m="1.5rem 2.5rem">
            <Header title='محصولات' subtitle='لیست محصولات فروشگاه' />
            <Box
                mt="20px"
                mb="20px"
                display="flex"
                justifyContent="flex-end"
            >
                <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="8px"
                    px={2}
                >
                    <InputBase
                        placeholder="جستجوی محصول..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: 250 }}
                    />

                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            {
                data || !isLoading ? (
                    <Box
                        mt="20px"
                        display="grid"
                        direction="rtl"
                        gridTemplateColumns="repeat(4,minmax(0, 1fr))"
                        justifyContent="space-between"
                        rowGap="20px"
                        columnGap="1.33%"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >

                        {filteredProducts.map(({
                            _id,
                            name,
                            description,
                            price,
                            rating,
                            category,
                            supply,
                            stat
                        }) => (
                            <Product
                                key={_id}
                                _id={_id}
                                name={name}
                                description={description}
                                price={price}
                                rating={rating}
                                category={category}
                                supply={supply}
                                stat={stat}
                            />
                        ))}
                    </Box>
                ) : error ? (
                    <p>something went wrong</p>
                ) : (
                    <section>
                        <Loader />
                    </section>
                )
            }
        </Box>
    )
}

export default Products