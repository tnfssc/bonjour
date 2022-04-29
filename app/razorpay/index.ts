/* eslint-disable no-undef */
import Razorpay from "razorpay"

const RAZORPAY_KEYID = process.env.RAZORPAY_KEYID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

// eslint-disable-next-line
// @ts-ignore
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEYID,
  key_secret: RAZORPAY_KEY_SECRET,
})

export default razorpay
