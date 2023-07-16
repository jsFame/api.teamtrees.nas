import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DonationsService } from './donations.service'

import { Prisma } from '@prisma/client'

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  create(@Args('createDonationInput') createDonationInput: Prisma.DonationCreateInput) {
    return this.donationsService.create(createDonationInput)
  }

  @Query('donations')
  findAll() {
    return this.donationsService.findAll()
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne({ id })
  }
}
