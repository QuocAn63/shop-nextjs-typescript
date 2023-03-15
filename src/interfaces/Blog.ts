import { StaffInterface } from "./Staff"

export interface BlogInterface {
    id: string
    slug: string
    theme: string
    title: string
    author: StaffInterface
    content: string
    createdAt: string
}