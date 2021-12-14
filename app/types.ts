import { Activity, Collection, Recipe } from '@prisma/client'

export type RecipeWithCollection = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string | null
  userId: number
  collections: Collection[]
}

export type UserWithRecipesAndCollection = {
  username: string
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
  recipes: Recipe[]
  collections: Collection[]
}

export type ActivityFeed = {
  id: number
  createdAt: Date
  recipe: {
    id: string
    title: string
  } | null
  collection: {
    id: string
    title: string
  } | null
  user: {
    firstName: string | null
    lastName: string | null
  }
}
