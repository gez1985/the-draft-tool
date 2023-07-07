const teams = [
  {
    name: "ARS",
    longName: "Arsenal",
    europe: true,
  },
  {
    name: "AVL",
    longName: "Aston Villa",
    europe: false,
  },
  {
    name: "BRE",
    longName: "Brentford",
    europe: false,
  },
  {
    name: "BOU",
    longName: "Bournemouth",
    europe: false,
  },
  {
    name: "BRI",
    longName: "Brighton and Hove Albion",
    europe: true,
  },
  {
    name: "CHE",
    longName: "Chelsea",
    europe: false,
  },
  {
    name: "CRY",
    longName: "Crystal Palace",
    europe: false,
  },
  {
    name: "FUL",
    longName: "Fulham",
    europe: false,
  },
  {
    name: "LIV",
    longName: "Liverpool",
    europe: true,
  },
  {
    name: "MCI",
    longName: "Manchester City",
    europe: true,
  },
  {
    name: "MUN",
    longName: "Manchester United",
    europe: true,
  },
  {
    name: "NEW",
    longName: "Newcastle United",
    europe: true,
  },
  {
    name: "NFO",
    longName: "Nottingham Forest",
    europe: false,
  },
  {
    name: "TOT",
    longName: "Tottenham Hotspur",
    europe: false,
  },
  {
    name: "WHU",
    longName: "West Ham United",
    europe: false,
  },
  {
    name: "WOL",
    longName: "Wolverhampton Wanderers",
    europe: false,
  },
];

const seedTeams = async (prisma: any) => {
  console.log("seeding teams");
  Promise.all(
    teams.map(async (team) => {
      console.log(`seeding ${team.name}`);
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
  console.log("teams seeded");
};

export { seedTeams };
