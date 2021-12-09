import { Collection } from '@prisma/client'

export type RecipeWithCollection = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  userId: string
  collections: Collection[]
}
