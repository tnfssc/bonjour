import { managerCtx, customerCtx } from "app/test-utils"

import addReservation from "./addReservation"
import bookRoom from "./bookRoom"
import cancelReservation from "./cancelReservation"
import deleteReservation from "./deleteReservation"
import editReservation from "./editReservation"

test("Add reservation", async () => {
  const reservation = await addReservation(
    {
      bookingPrice: BigInt(100),
      check_in: new Date(new Date().toDateString()),
      check_out: new Date(),
      customer_id: "12738d5e-9f17-4c48-bf1c-e7ec33ee3904",
      price: 0,
      room_id: 6,
      valid: true,
      id: 120,
    },
    managerCtx
  )
  console.log(reservation)
  expect(reservation).toBeDefined()
})

test("Book room", async () => {
  const reservation = await bookRoom(
    {
      bookingPrice: BigInt(100),
      check_in: new Date(new Date().toDateString()),
      check_out: new Date(),
      customer_id: "12738d5e-9f17-4c48-bf1c-e7ec33ee3904",
      price: 0,
      room_id: 6,
      valid: true,
      id: 120,
    },
    customerCtx
  )
  console.log(reservation)
  expect(reservation).toBeDefined()
})

test("Cancel reservation", async () => {
  const reservation = await cancelReservation(
    {
      id: 120,
    },
    managerCtx
  )
  console.log(reservation)
  expect(reservation).toBeDefined()
})

test("Delete reservation", async () => {
  const reservation = await deleteReservation(
    {
      id: 120,
    },
    managerCtx
  )
  console.log(reservation)
  expect(reservation).toBeDefined()
})

test("Edit reservation", async () => {
  const reservation = await editReservation(
    {
      id: 120,
      bookingPrice: BigInt(100),
      check_in: new Date(new Date().toDateString()),
      check_out: new Date(),
      customer_id: "12738d5e-9f17-4c48-bf1c-e7ec33ee3904",
      price: 0,
      room_id: 6,
      valid: true,
    },
    managerCtx
  )
  console.log(reservation)
  expect(reservation).toBeDefined()
})
