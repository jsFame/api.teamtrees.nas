import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.donation.deleteMany()
  const hiro = await prisma.donation.create({
    data: {
      email: 'hiroe@teamtrees.nas',
      displayName: 'hiro',
      count: 5,
    },
  })

  console.log({ hiro })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
