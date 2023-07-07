const teams = [
  {
    name: "EVE",
    longName: "Everton",
    europe: false,
  },
];

const addTeams = async (prisma: any) => {
  console.log("adding teams");
  Promise.all(
    teams.map(async (team) => {
      console.log(`adding ${team.name}`);
      await prisma.team.upsert({
        where: { name: team.name },
        update: {
          name: team.name,
          longName: team.longName,
          europe: team.europe,
        },
        create: {
          name: team.name,
          longName: team.longName,
          europe: team.europe,
        },
      });
    })
  );
  console.log("teams added");
};

export { addTeams };
