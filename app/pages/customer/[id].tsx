import { Head, Ctx, ErrorComponent, useMutation, useQuery, useParams } from "blitz"
import { RoomType } from "db"
import getCustomer from "app/customers/queries/getCustomer"
import CustomerCard from "../utilities/customerCard"
import getRooms from "app/rooms/queries/getRooms"
import getReservations from "app/reservations/queries/getReservations"
import React from "react"
import Button from "@mui/material/Button"
import Roomcard from "../utilities/roomCard"
import { styled } from "@material-ui/core/styles"
import Dialog, { DialogProps } from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
import Box from "@mui/material/Box"
import TextField from "@material-ui/core/TextField"
import Input from "@material-ui/core/Input"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { useSearchParams } from "react-router-dom"
import { Numbers } from "@mui/icons-material"

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
})) as React.FC<DialogProps>

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle style={{ margin: 0, padding: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

function Reservations(props) {
  console.log(props.data)
  return (
    <div>
      <Box sx={{ maxWidth: 400 }}>
        {" "}
        <Card style={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent style={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Room No. {props.data.room_id}
              </Typography>
              <b />
              <Typography variant="body2" color="textSecondary">
                {props.data.room}
              </Typography>{" "}
              <Typography variant="body2" color="textSecondary">
                Check In: {props.data.check_in.toString()}
              </Typography>{" "}
              <b />
              <Typography variant="body2" color="textSecondary">
                Check Out: {props.data.check_out ? props.data.check_out.toString() : null}
              </Typography>
            </CardContent>
            <a href={"/room/" + props.data.room_id}>Room Details</a>
          </Box>
        </Card>
      </Box>
    </div>
  )
}

export default function CustomerDetails() {
  const customerId = useParams()
  const [customerDets] = useQuery(getCustomer, { id: customerId.id })
  console.log(customerDets)
  const [reservations] = useQuery(getReservations, { customer_id: customerId.id })
  const allReservations = reservations?.map((res) => <Reservations data={res} />)

  return (
    <div style={{ margin: 20 }}>
      <Head>
        <title>Our App</title>
      </Head>
      <Box sx={{ maxWidth: 350 }}>
        <CustomerCard data={customerDets} />
      </Box>{" "}
      <h1>Reservations:</h1>
      <b></b>
      <>{allReservations}</>
    </div>
  )
}
