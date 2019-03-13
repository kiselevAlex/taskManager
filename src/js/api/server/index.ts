import LoginData from './../types/LoginData'
import Task from './../types/Task'
import * as firebase from 'firebase'

export default class ApiServer {
    
    public static async fetchToken (data: LoginData): Promise<{ user?: firebase.User; token?: string; code: number }> {
        try {
            const { user } = await firebase.auth().signInWithEmailAndPassword(data.login, data.password)
            if (!user) throw "User not found"
            return { user, token: (user as firebase.User).uid, code: 200 }
        } catch (e) {
            return { code: 400 }
        }
    }

    public static async fetchTasks (uid?: string): Promise<{ code: number, tasks?: Array<Task> }> {
        try {
            const snapshot = await firebase.database().ref(`tasks/${uid}`).once('value')
            let ar: Array<Task> = new Array<Task>();
            snapshot.forEach(function(childSnapshot) {
                ar.push(childSnapshot.val());
            });
            return { code: 200, tasks: ar }
        } catch (e) {
            return { code: 400 }
        }
    }

    public static async editTasks(data: Task, uid?: string): Promise<{ code: number, task?: Task }> {
        try {
            await firebase.database().ref(`tasks/${uid}/${data.id}`).set(data)
            return { code: 200, task: data }
        } catch (e) {
            switch(e.code){
                case "PERMISSION_DENIED":
                    return { code: 403 }
                default:
                    return { code: 401 }
            }
        }
    }
}