export const addSubCategory = (data) => {
    return {
        type: 'ADD_SUBCATEGORY',
        payload: data
    }
}

export const updateSubCategory = (data) => {
    return {
        type: 'UPDATE_SUBCATEGORY',
        payload: data
    }
}

export const listSubCategories = (data) => {
    return {
        type: 'LIST_SUBCATEGORIES',
        payload: data
    }
}
