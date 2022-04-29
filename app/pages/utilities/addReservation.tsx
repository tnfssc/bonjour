import { Head, useMutation, useQuery } from "blitz"
import addReservation from "app/reservations/mutations/addReservation"
import cancelReservation from "app/reservations/mutations/cancelReservation"
import deleteReservation from "app/reservations/mutations/deleteReservation"
import editReservation from "app/reservations/mutations/editReservation"
import React from "react"
import Button from "@mui/material/Button"
import Roomcard from "../utilities/roomCard"
import { styled } from "@material-ui/core/styles"
import Dialog, { DialogProps } from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"
import { CancelPresentationRounded } from "@mui/icons-material"

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

function CancelReservation() {
  const [open, setOpen] = React.useState(false)
  const [cancelMutation] = useMutation(cancelReservation)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleCancel = (event) => {
    cancelMutation({ id: Number(event.target.id.value) })
    event.preventDefault()
  }
  return (
    <div>
      <b />
      <b />
      <Button color="secondary" variant="outlined" onClick={handleClickOpen}>
        Cancel Reservation
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Reservation Details
        </BootstrapDialogTitle>

        <form style={{ margin: 10 }} onSubmit={handleCancel}>
          <TextField label="Reservation Id" name="id" type="number" />

          <DialogActions>
            <Button autoFocus type="submit" value="Submit" onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </form>
        <b />
      </BootstrapDialog>
    </div>
  )
}

function DeleteReservation() {
  const [open, setOpen] = React.useState(false)
  const [deleteMutation] = useMutation(deleteReservation)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleCancel = (event) => {
    deleteMutation({ id: Number(event.target.id.value) })
    event.preventDefault()
  }
  return (
    <div>
      <b />
      <b />
      <Button color="error" variant="outlined" onClick={handleClickOpen}>
        Delete Reservation
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Reservation Details
        </BootstrapDialogTitle>

        <form style={{ margin: 10 }} onSubmit={handleCancel}>
          <TextField label="Reservation Id" name="id" type="number" />

          <DialogActions>
            <Button autoFocus type="submit" value="Submit" onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </form>
        <b />
      </BootstrapDialog>
    </div>
  )
}

function EditReservation() {
  const [open, setOpen] = React.useState(false)
  const [editMutation] = useMutation(editReservation)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleCancel = (event) => {
    editMutation({
      id: event.target.id.value,
      customer_id: event.target.customer_id.value,
      rooom_id: Number(event.target.rooom_id.value),
      check_in: event.target.check_in.value,
      check_out: event.target.id.value,
    })
    event.preventDefault()
  }
  return (
    <div>
      <b />
      <b />
      <Button color="secondary" variant="outlined" onClick={handleClickOpen}>
        Edit Reservation
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Reservation Details
        </BootstrapDialogTitle>

        <form style={{ margin: 10 }} onSubmit={handleCancel}>
          <TextField label="Reservation Id" name="id" type="number" />
          <TextField label="Customer Id" name="customer_id" />
          <TextField label="Room Id" name="room_id" type="number" />
          <TextField
            label="Check In"
            name="check_in"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Check Out"
            name="check_out"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <DialogActions>
            <Button autoFocus type="submit" value="Submit" onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </form>
        <b />
      </BootstrapDialog>
    </div>
  )
}

export default function AddReservation() {
  const [open, setOpen] = React.useState(false)
  const [mutation] = useMutation(addReservation)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async (event) => {
    mutation({
      customer_id: event.target.customer_id.value,
      room_id: Number(event.target.room_id.value),
      check_in: event.target.check_in.value + "T00:00:00.000Z",
      check_out: event.target.check_out.value + "T00:00:00.000Z",
    })
    event.preventDefault()
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Reservation
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Reservation Details
        </BootstrapDialogTitle>

        <form style={{ margin: 10 }} onSubmit={handleSubmit}>
          <TextField label="Customer ID" name="customer_id" />
          <TextField label="Room Id" name="room_id" type="number" />
          <TextField
            label="Check In Date"
            name="check_in"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Check Out date"
            name="check_out"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <DialogActions>
            <Button autoFocus type="submit" value="Submit" onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </form>
        <b />
      </BootstrapDialog>

      <b />
      <CancelReservation />
      <b />
      <b />
      <DeleteReservation />
      <b />
      <EditReservation />
    </div>
  )
}
