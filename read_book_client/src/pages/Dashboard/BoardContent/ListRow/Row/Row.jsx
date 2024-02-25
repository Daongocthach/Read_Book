import { useState, useEffect } from 'react'
import { Box, Typography, Stack } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import productApi from '../../../../../apis/productApi'
import { mockData } from '../../../../../apis/mockdata'
import Book from '../../../../../components/Book/Book'

function Row({ item }) {
    const [books, setBooks] = useState(mockData?.books)
    // useEffect(() => {
    //     if (category.id) {
    //         productApi.getProductsByCategoryId(category.id)
    //             .then(response => {
    //                 setProducts(response.data)
    //             })
    //             .catch(error => {
    //                 console.error(error)
    //             })
    //     }
    // }, [])
    return (
        <Box mt={2} >
            {books.length > 0 &&
                <Box display={'flex'} alignItems={'center'} gap={1} ml={{ xs: 2, sm: 5, md: 20 }} >
                    <Typography variant={'h6'} sx={{ fontWeight: 'bold', fontSize: 15 }}>
                        {item}
                    </Typography>
                    <ArrowForwardIos fontSize='10' />
                </Box>
            }
            <Box sx={{ borderRadius: '6px', width: 'fit-content' }} ml={{ xs: 2, sm: 5, md: 20 }} mr={{ xs: 1, sm: 2, md: 20 }}>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                    {
                        books?.map((book, index) => (
                            <Book book={book} key={index}/>
                        ))
                    }
                </Stack>
            </Box>
        </Box >
    )
}

export default Row