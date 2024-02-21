const initialState = {
    id: '',
    username: '',
    email: '',
    fullName: '',
    phoneNo: '',
    address: ''
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOGIN': {
            console.log({
                ...state,
                ...action
            })
            return {
                ...state,
                ...action.payload
            }
        }

        case 'UPDATE_FULLNAME': {
            console.log({
                ...state,
                fullName: action?.payload?.fullName
            })
            return {
                ...state,
                fullName: action?.payload?.fullName
            }
        }


        case 'LOGOUT': {
            return {
                id: '',
                username: '',
                email: '',
                fullName: '',
                phoneNo: '',
                point: '',
                address: '',
                avatar: ''
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer
