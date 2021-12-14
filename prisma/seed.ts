import { PrismaClient } from '@prisma/client'
let prisma = new PrismaClient()

async function seed() {
  let user = await prisma.user.create({
    data: {
      email: 'simon.wallstrom@gmail.com',
      username: 'simonwallstrom',
      firstName: 'Simon',
      lastName: 'Wallström',
      passwordHash: '$2a$10$w05ZeYZcBmsy/IQNSNeZZODTXESdVnQ4jgux5YkQbyG8gruPazuX',
    },
  })

  await Promise.all(
    getRecipes().map((recipe) => {
      let data = { userId: user.id, ...recipe }
      return prisma.recipe.create({ data })
    })
  )
}

seed()

function getRecipes() {
  return [
    {
      title: 'Lasagna',
      description: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      title: 'Smash burger',
      description: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      title: 'American pancakes',
      description: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
  ]
}
