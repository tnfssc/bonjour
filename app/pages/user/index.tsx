import { Head, useMutation, useParams, useQuery } from "blitz"
import addEditRoom from "app/rooms/mutations/addEditRoom"
import AddReservation from "../utilities/addReservation"
import getAllRooms from "app/rooms/queries/getAllRooms"
import React from "react"
import Button from "@mui/material/Button"
import UserRoomCard from "../utilities/userRoomCard"
import { styled } from "@material-ui/core/styles"
import Dialog, { DialogProps } from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import AllReservations from "../utilities/reservations"

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
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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

function ShowReservations() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        All Reservations
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          All Reservations
        </BootstrapDialogTitle>
        <AllReservations />
      </BootstrapDialog>

      <b />
    </div>
  )
}

export default function DisplayRooms() {
  const [allRooms] = useQuery(getAllRooms, {})
  console.log(allRooms)
  const displayRooms = allRooms?.map((room) => (
    <Box key={room.id} sx={{ maxWidth: 350 }}>
      {/* <UserRoomCard data={room} /> */}
    </Box>
  ))
  return (
    <>
      <Head>
        <title>Our App</title>
      </Head>
      <ShowReservations />
      {/*<div>{displayRooms}</div> */}
    </>
  )
}
