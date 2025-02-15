export const ORGANIZER = "organizer"
export const USER = "user"
export const ADMIN = "admin"

export type TOrganizer = typeof ORGANIZER
export type TUSER = typeof USER
export type TADMIN = typeof ADMIN

export type AuthorizedRoles = TOrganizer | TUSER | TADMIN