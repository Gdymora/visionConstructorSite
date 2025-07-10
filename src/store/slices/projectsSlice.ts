import { Project } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectsState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectsState = {
    projects: [],
    loading: false,
    error: null
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
        },
        setProjectsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setProjectsError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { setProjects, setProjectsLoading, setProjectsError } = projectsSlice.actions;
export default projectsSlice.reducer;

/* 
import { useDispatch } from 'react-redux';
const dispatch = useDispatch();
useEffect(() => {
  const fetchProjects = async () => {
    dispatch(setProjectsLoading());
    try {
      const token = localStorage.getItem("token");
      const response = await sendRequest(
        "get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response && response.data) {
        dispatch(setProjects(response.data));
        setProjects(response.data);
      }
    } catch (error) {
      dispatch(setProjectsError(error.message));
    }
  };

  fetchProjects();
}, [dispatch]);
*/


/* 
const { projects } = useSelector((state: RootState) => state.projects);
const [selectedProjectId, setSelectedProjectId] = useState<number | null>(currentProject?.id || null);

*/