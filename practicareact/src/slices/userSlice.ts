import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserInfoResponse } from '../models/responses/UserInfoResponse'
interface UserState {
    username: string,
    firstName: string,
    lastName: string,
}
const initialState: UserState = {
    username: '',
    firstName: '',
    lastName: '',
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserInfo: (state, action: PayloadAction<UserInfoResponse>) => {
            state.username  = action.payload.username
            state.firstName = action.payload.first_name
            state.lastName  = action.payload.last_name
        },
        logout: (state) => {
            state.username = ""
            state.firstName = ""
            state.lastName = ""
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, saveUserInfo } = userSlice.actions

export default userSlice.reducer