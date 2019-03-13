import Task from './types/Task';
import LoginData from './types/LoginData';

export default interface Api {
    fetchToken: (data: LoginData) => Promise<{ user?: firebase.User; token?: string; code: number }>;
    fetchTasks: (uid?: string) => Array<Task>;
    editTasks: (data: Task) => Task;
}