import { managerCtx } from "app/test-utils"

import availableRooms from "./availableRooms"
import getReservations from "./getReservations"
import roomAvailability from "./roomAvailability"

test("Available rooms", async () => {
  const rooms = await availableRooms(
    {
      check_in: new Date(new Date().toDateString()),
      check_out: new Date(),
      capacity: 2,
      suite: "Deluxe",
    },
    managerCtx
  )
  console.log(rooms)
  expect(rooms).toBeDefined()
})

test("Get reservations", async () => {
  const reservations = await getReservations(
    {
      room_id: 6,
    },
    managerCtx
  )
  console.log(reservations)
  expect(reservations).toBeDefined()
})

test("Room availability", async () => {
  const availability = await roomAvailability(
    {
      check_in: new Date(new Date().toDateString()),
      check_out: new Date(),
      room_id: 6,
    },
    managerCtx
  )
  console.log(availability)
  expect(availability).toBeDefined()
})
