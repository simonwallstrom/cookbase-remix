import { Activity, Collection, Recipe, Tag } from '@prisma/client'

export type RecipeWithCollectionAndTags = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  description: string | null
  userId: number
  collections: Collection[]
  tags: Tag[]
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
  recipes: {
    id: string
    title: string
  } | null
  collections: {
    id: string
    title: string
  } | null
  user: {
    firstName: string | null
    lastName: string | null
  }
}
