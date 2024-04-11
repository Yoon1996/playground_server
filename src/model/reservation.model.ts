export interface IReservationModel {
    id: number
    userId: number
    gymId: number
    locationName: string
    date: Date
    people: string
    phoneNumber: string
    time: string
    price: string
    paymentMethod: string
    createdAt: Date
    updatedAt: Date
}