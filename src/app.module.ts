import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { GraphQLDateTime } from 'graphql-iso-date'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: false,
      driver: ApolloDriver,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: GraphQLDateTime },
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
