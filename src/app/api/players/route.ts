import { NextResponse } from "next/server";
import { prisma } from "../../../lib/primsa";

export async function GET() {
  try {
    let players;
    const main = async () => {
      // ... you will write your Prisma Client queries here
      players = await prisma.player.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          points: true,
          team: { select: { name: true, longName: true, europe: true } },
          position: { select: { name: true } },
          stats: true,
        },
        orderBy: {
          name: "desc",
        },
      });
    };

    await main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });

    return NextResponse.json(
      {
        success: true,
        players,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "internal server error",
      },
      { status: 500 }
    );
  }
}
