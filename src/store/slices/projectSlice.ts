import { createSlice } from '@reduxjs/toolkit';


// Початковий стан для користувача
const initialState = {
    project: {
        id: null,
        user_id: null,
        name: '',
        project_data: '',
        created_at: '',
        updated_at: '',
    }
};

export const projectSlice = createSlice({
    name: 'project',
    initialState: initialState.project,
    reducers: {
        setProject: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;

/*   const project = useSelector((state: any) => state.project); */