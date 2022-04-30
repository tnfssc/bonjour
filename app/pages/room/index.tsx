import { Head, useMutation, useParams, useQuery } from "blitz"
import addEditRoom from "app/rooms/mutations/addEditRoom"
import AddReservation from "../utilities/addReservation"
import getAllRooms from "app/rooms/queries/getAllRooms"
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

function AddRoom() {
  const [open, setOpen] = React.useState(false)
  const [mutation] = useMutation(addEditRoom)
  const [allRooms] = useQuery(getAllRooms, {})

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async (event) => {
    mutation({
      id: Number(event.target.id.value),
      suite: event.target.suite.value,
      number: `${event.target.number.value}`,
      capacity: Number(event.target.capacity.value),
    })
    event.preventDefault()
  }
  const displayRooms = allRooms?.map((room) => (
    <Box key={room.id} sx={{ maxWidth: 350 }}>
      <Roomcard data={room} />
    </Box>
  ))

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Room
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Room
        </BootstrapDialogTitle>

        <form style={{ margin: 10 }} onSubmit={handleSubmit}>
          <TextField
            required
            //onChange={handleChange}

            label="ID"
            name="id"
            type="number"
          />
          <TextField
            required
            //onChange={handleChange}

            label="suite"
            name="suite"
          />
          <TextField
            required
            // onChange={handleChange}

            label="Number"
            name="number"
            type="number"
          />
          <TextField
            required
            // onChange={handleChange}

            label="Capacity"
            name="capacity"
            type="number"
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
      <AddReservation />
      <b />

      {displayRooms}
    </div>
  )
}

export default function Room() {
  return (
    <>
      <Head>
        <title>Our App</title>
      </Head>
      <AddRoom />
    </>
  )
}
