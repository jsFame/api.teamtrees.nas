import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  create(createDonationInput: Prisma.DonationCreateInput) {
    return this.prisma.donation.create({
      data: createDonationInput,
    })
  }

  findAll() {
    return this.prisma.donation.findMany()
  }

  findOne(uniqueKey: Prisma.DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({
      where: uniqueKey,
    })
  }
}
