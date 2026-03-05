import { Injectable } from "@nestjs/common";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      database: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
}
