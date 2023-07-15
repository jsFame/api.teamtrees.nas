import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // FIXME doesn't work for e2e OnModuleDestroy{
  // https://docs.nestjs.com/fundamentals/lifecycle-events

  constructor(config: ConfigService) {
    const sslcert = '?sslcert=root.crt'
    //https://www.prisma.io/docs/concepts/database-connectors/postgresql#configuring-an-ssl-connection
    super({
      datasources: {
        db: {
          url: config.get<string>('DATABASE_URL') + sslcert,
        },
      },
    })
  }

  // async onModuleDestroy() {
  //   console.warn(new Date(), 'disconnecting the database')
  //   await this.$disconnect()
  //   console.info(new Date(), 'disconnected database')
  // }

  async onModuleInit() {
    console.info(new Date(), 'connecting to the database')
    await this.$connect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
