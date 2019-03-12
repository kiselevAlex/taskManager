import User from './types/User';
import Task from './types/Task';
import Token from './types/Token';

export default interface Api {
    fetchToken: (data: User) => Token;
    fetchTasks: (data: object) => Array<Task>;
    editTasks: (data: Task) => Task;
}