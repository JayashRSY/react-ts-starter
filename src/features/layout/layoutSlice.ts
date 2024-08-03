import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface userState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isLoading: boolean,
    isMobile: boolean
}

const initialState: userState = {
    isLoading: false,
    isMobile: false
}

export const userSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setLoader: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setMobile: (state, action: PayloadAction<boolean>) => {
            state.isMobile = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoader, setMobile } = userSlice.actions

export default userSlice.reducer