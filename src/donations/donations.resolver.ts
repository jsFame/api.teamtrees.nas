import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { DonationsService } from './donations.service'

import { Prisma } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()
@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  async create(
    @Args('createDonationInput') createDonationInput: Prisma.DonationCreateInput,
  ) {
    const created = await this.donationsService.create(createDonationInput)

    const total = await this.donationsService.getTotal()

    pubSub.publish('totalUpdated', { totalUpdated: { total } })

    return created
  }

  @Query('donations')
  findAll(@Args('orderBy') orderBy?: object) {
    //FIXME: OrderByParams
    console.debug({ findAll: orderBy })
    return this.donationsService.findAll(orderBy)
  }

  @Subscription()
  totalUpdated() {
    return pubSub.asyncIterator('totalUpdated')
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne({ id })
  }

  @Query('totalDonations')
  totalDonations() {
    return this.donationsService.getTotal()
  }
}
