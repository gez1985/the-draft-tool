import { NextResponse } from "next/server";
import { prisma } from "../../../lib/primsa";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "session not found" },
        { status: 200 }
      );
    }

    let returnUser;

    const main = async () => {
      // ... you will write your Prisma Client queries here
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email || "no user",
        },
      });
      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
          },
        });
        returnUser = newUser;
      } else {
        returnUser = user;
      }
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
        user: returnUser,
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

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "session not found" },
        { status: 400 }
      );
    }

    const body = await request.json();
    let returnUser;

    const main = async () => {
      // ... you will write your Prisma Client queries here

      const updateUser = await prisma.user.update({
        where: {
          email: session?.user?.email || "",
        },
        data: body.updatedUser,
      });

      if (!updateUser) {
        return NextResponse.json(
          { success: false, error: "user not found" },
          { status: 400 }
        );
      }

      returnUser = updateUser;
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
        user: returnUser,
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

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "session not found" },
        { status: 400 }
      );
    }

    const main = async () => {
      // ... you will write your Prisma Client queries here

      const deletedUser = await prisma.user.delete({
        where: {
          email: session?.user?.email || "",
        },
      });

      if (!deletedUser) {
        return NextResponse.json(
          { success: false, error: "user not found" },
          { status: 400 }
        );
      }
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

    return NextResponse.json({ status: 204 });
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
