export default interface Task {
    readonly id: number,
    title: string,
    about: string,
    date: Date,
    time_plan: number,
    time_real: number,
    status: string
}