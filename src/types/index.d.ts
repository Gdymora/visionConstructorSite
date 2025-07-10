export interface Project {
    id: number;
    user_id: number;
    super_user_id: number;
    name: string;
    project_data: string;
    created_at: string;
    updated_at: string;
}

interface ChannelsState {
    items: Channel[];
    selectedChannel: Channel | null;
}

export interface RootState {
    project: Project;
    projects: {
        projects: Project[];
        loading: boolean;
        error: string | null;
    };
    channels: ChannelsState;
}

export interface MessageParams {
    peer: string | number;
    message: string;
    silent: boolean;
    random_id: number;
    schedule_date?: number;
    media?: any[];
  }