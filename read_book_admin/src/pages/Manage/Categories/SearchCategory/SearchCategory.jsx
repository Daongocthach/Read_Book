import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField, Autocomplete, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import categoryApi from '../../../../apis/categoryApi'
import { sortByMaxId } from '../../../../utils/sort'

function SearchCategory({ setCategories }) {
    const datas = useSelector(state => state.categories.categories)
    const colorChangeByTheme = (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
    const handleDatasSelect = (event, value) => {
        if (value !== null) {
            categoryApi.getCategoryById(value.id)
                .then(response => {
                    setCategories([response.data])
                })
                .catch(err => { console.log(err) })
        }
        else { setCategories(sortByMaxId(datas)) }

    }
    return (
        <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
                freeSolo
                options={datas}
                getOptionLabel={(data) => (data && data.name) || ''}
                onChange={handleDatasSelect}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search..."
                        type="text"
                        size='small'
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') }} />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            minWidth: '120px',
                            maxWidth: '300px',
                            '& label': { color: colorChangeByTheme },
                            '& input': { color: colorChangeByTheme },
                            '& label.Mui-focused': { fontWeight: 'bold' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: colorChangeByTheme },
                                '&:hover fieldset': { borderColor: colorChangeByTheme },
                                '&.Mui-focused fieldset': { borderColor: colorChangeByTheme }
                            }
                        }} />)} />
        </Stack>
    )
}

export default SearchCategory