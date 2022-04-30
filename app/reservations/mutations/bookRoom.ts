import { Ctx } from "blitz"
import db, { Reservation } from "db"

import roomAvailability from "../queries/roomAvailability"

import { razorpay as rp } from "types"
import razorpay from "app/razorpay"

export type BookRoomInput = Reservation & { check_out: Date }

const bookRoom = async ({ customer_id, ...rest }: BookRoomInput, ctx: Ctx) => {
  const { user } = ctx
  if (!user) return
  if (
    !(await roomAvailability(
      { room_id: rest.room_id, check_in: rest.check_in, check_out: rest.check_out },
      ctx
    ))
  )
    return
  if (user.role !== "CUSTOMER") return
  const reservation = await db.reservation.create({
    data: { customer_id: user.id, ...rest, valid: false },
    include: {
      room: {
        include: {
          basePrice: true,
        },
      },
    },
  })
  const basePrice = parseInt(`${reservation.room.basePrice.base_price}`)

  const params: rp.RazorpayPaymentLinkRequest = {
    amount: basePrice * 100,
    currency: "INR",
    description: `Rohit's hotel ${reservation.room.suite} payment`,
    customer: {
      email: `${user.email}`,
    },
    notify: {
      sms: true,
      email: true,
    },
    reference_id: `reservation_${reservation.id}`,
    expire_by: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week
  }
  const r = (await razorpay.paymentLink.create(params)) as rp.RazorpayPaymentLinkResponse
  if (r) return { payment_link: r.short_url }
  throw new Error("Payment link not created")
}

export default bookRoom
