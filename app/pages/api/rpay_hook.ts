import { BlitzApiHandler } from "blitz"
import { razorpay as rp } from "types"

import db from "db"

const handler: BlitzApiHandler = async (req, res) => {
  try {
    const [_, reservationId] = (
      req.body as rp.RazorpayRequest
    ).payload.payment_link.entity.reference_id.split("_")
    if (!reservationId) throw new Error("Invalid reservation id")
    const { valid } = await db.reservation.update({
      where: { id: parseInt(reservationId) },
      data: { valid: true },
    })
    if (!valid) throw new Error("Reservation not valid")
    return res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}

export default handler
