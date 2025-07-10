import { createSlice } from '@reduxjs/toolkit';

// Тип для структури даних користувача
export interface UserProfile {
    id: number;
    name: string;
    email: string;
}

// Початковий стан для користувача
const initialState = {
    user: {
        id: 0,
        name: '',
        email: '',
    },
};

// Створення срезу для користувача
const userSlice = createSlice({
    name: 'user',
    initialState: initialState.user,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

/*   const user = useSelector((state: any) => state.user); */
