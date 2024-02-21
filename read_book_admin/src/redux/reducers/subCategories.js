const initialState = {
    subCategories: []
  }
  const subCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SUBCATEGORY':
            return {
                ...state,
                subCategories: [...state.subCategories, action.payload]
            }
        case 'UPDATE_SUBCATEGORY': {
            const updateIndex = state.subCategories.findIndex(subCategory => subCategory.id === action.payload.id)
            return {
                ...state,
                subCategories: [
                    ...state.subCategories.slice(0, updateIndex),
                    action.payload,
                    ...state.subCategories.slice(updateIndex + 1)
                ]
            }
        }
        case 'LIST_SUBCATEGORIES':
            return {
              ...state,
              subCategories: action.payload
            }
        default:
            return state
    }
  }
  export default subCategoriesReducer