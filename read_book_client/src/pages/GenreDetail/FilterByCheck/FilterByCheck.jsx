import { Box, Typography, Checkbox } from '@mui/material'
import { useState } from 'react'

function FilterByCheck({ category, price }) {
    const [checked, setChecked] = useState(false)

    const handleChange = (event) => {
        setChecked(event.target.checked)
        if (event.target.checked == true)
           console.log(category?.id)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Checkbox checked={checked} onChange={handleChange} />
            <Typography variant='body1' >{category?.name || price}</Typography>
        </Box>
    )
}

export default FilterByCheck