import { PrismaClient } from "@prisma/client";
import { seedTeams } from "./seed-teams";
import { seedPositions } from "./seed-positions";
import { seedPlayers } from "./seed-players";

const prisma = new PrismaClient();
async function main() {
  // seedTeams(prisma);
  // seedPositions(prisma);
  seedPlayers(prisma)
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
