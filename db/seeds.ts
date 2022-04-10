import db from "."

import faker from "@faker-js/faker"

const seed = async () => {
  for (let i = 0; i < 10; i++) {
    await db.room.create({
      data: {
        number: `${faker.datatype.number({ max: 999, min: 100 })}`,
      },
    })
  }
}

export default seed
