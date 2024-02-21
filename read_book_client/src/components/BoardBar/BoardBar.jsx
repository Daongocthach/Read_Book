import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import categoryApi from '../../apis/categoryApi'
import MenuCategory from './MenuCategory/MenuCategory'

function BoardBar() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        categoryApi.getAllEnabledCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
    return (
        <Box sx={{
            width: '100%', height: (theme) => theme.webCustom.boardBarHeight, display: 'flex', alignItems: 'center',
            justifyContent: 'flex-start', gap: 2, paddingX: 2, overflow: 'auto', borderTop: '1px solid #D3D3D3',
            overflowY: 'hidden', bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#363636' : 'white')
        }}>
            {categories?.map((category) => (
                <MenuCategory key={category.id} category={category}/>
            ))}
        </Box>
    )
}

export default BoardBar