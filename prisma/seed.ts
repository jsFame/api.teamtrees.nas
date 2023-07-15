import { PrismaClient } from '@prisma/client'
import { date } from 'joi'
const prisma = new PrismaClient()

async function main() {
  await prisma.wallet.deleteMany()
  const wallet = await prisma.wallet.create({
    data: {
      address: 'of1ExCK6cWFxCxtUGw2civp4RKejVSQ5EzntJPntDTP',
    },
  })
  const todo_board = await prisma.board.create({
    data: {
      walletId: wallet.id,
      isActive: true,
      name: 'Taskmon.ai',
    },
  })

  const todo_cln = await prisma.column.create({
    data: {
      name: 'TODO',
      boardId: todo_board.id,
    },
  })

  const scaffold_task = await prisma.task.create({
    data: {
      title: 'Scaffold: nestjs',
      description: `
      - Support /auth endpoint,
      `.trim(),
      columnId: todo_cln.id,
    },
  })

  const todo_task = await prisma.task.create({
    data: {
      title: 'Scaffold: graphql',
      description: `
      - Support /graphql endpoint,
      - Will be be able query all the tasks,
      - Create Mutations to support CRUD on tasks,boards, subtasks
      `.trim(),
      columnId: todo_cln.id,
    },
  })
  const subtasks_scaffold = await prisma.subtask.createMany({
    data: [
      { title: 'integrate apolo server', taskId: todo_task.id },
      { title: 'nest g resource task', taskId: todo_task.id, isCompleted: true },
      {
        title: 'go with schema first resource creation',
        taskId: todo_task.id,
        isCompleted: true,
      },
    ],
  })

  console.log({ wallet, board: todo_board, todo_cln, todo_task, subtasks_scaffold })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
