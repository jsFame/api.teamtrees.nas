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

  findAll(orderBy?: { field?: string; direction?: string }) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {}
    return this.prisma.donation.findMany({
      orderBy: {
        [field]: direction,
      },
    })
  }

  findOne(uniqueKey: Prisma.DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({
      where: uniqueKey,
    })
  }
}
