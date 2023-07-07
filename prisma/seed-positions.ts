const positions = [
  { name: "GK" },
  { name: "DF" },
  { name: "DM" },
  { name: "MF" },
  { name: "FW" },
];

const seedPositions = async (prisma: any) => {
  console.log("seeding positions");
  Promise.all(
    positions.map(async (position) => {
      await prisma.position.upsert({
        where: { name: position.name },
        update: {
          name: position.name,
        },
        create: {
          name: position.name,
        },
      });
    })
  );
};

export { seedPositions };
