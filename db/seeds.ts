import db from "."

import faker from "@faker-js/faker"

const seed = async () => {
  await db.room.createMany({
    data: [
      {
        number: `${faker.datatype.number({ min: 100, max: 999 })}`,
        suite: "Elite",
        capacity: 2,
      },
      {
        number: `${faker.datatype.number({ min: 100, max: 999 })}`,
        suite: "Luxury",
        capacity: 2,
      },
      {
        number: `${faker.datatype.number({ min: 100, max: 999 })}`,
        suite: "Premium",
        capacity: 3,
      },
      {
        number: `${faker.datatype.number({ min: 100, max: 999 })}`,
        suite: "VIP",
        capacity: 2,
      },
    ],
    skipDuplicates: true,
  })
  const users = new Array(0).map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    firstName: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
  }))
  await db.account.createMany({
    data: users.map(({ id }) => ({
      provider: "seed",
      providerAccountId: "NaN",
      type: "test",
      userId: id,
    })),
    skipDuplicates: true,
  })
  await db.user.createMany({
    data: users.map(({ email, id, name }) => ({
      id,
      name: name,
      email: email,
    })),
    skipDuplicates: true,
  })
  await db.customer.createMany({
    data: users.map(({ phone, id, name }) => ({
      firstName: name,
      id,
      phone,
    })),
  })
}

export default seed
