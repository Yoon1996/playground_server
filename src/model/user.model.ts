import { sexType } from "src/entity/user.entity"

export interface IUserModel {
    id: number
    name: string
    email: string
    password: string
    sex: sexType
    phoneNumber: string
    birth: Date
    provider: string
    withDraw: boolean
    createdAt: Date
    updatedAt: Date
}