import { Head, Ctx, ErrorComponent, useMutation, useQuery } from "blitz"
import { RoomType } from "db"
import addEditRoom from "../../rooms/mutations/addEditRoom.ts"
import React from "react"
import Button from "@mui/material/Button"
import Roomcard from "../utilities/editRoom"
import { styled } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Typography from "@material-ui/core/Typography"
// import Box from "@material-ui/core/Box"
import Box from "@mui/material/Box"
import TextField from "@material-ui/core/TextField"
import Input from "@material-ui/core/Input"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"

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

function AddRoom() {
  const [id, setId] = React.useState(null)
  const [suite, setSuite] = React.useState(null)
  const [number, setNumber] = React.useState(null)
  const [capacity, setCapacity] = React.useState(null)

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(null)
  const [mutation] = useMutation(addEditRoom)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async (event) => {
    mutation({
      id: NUmber(event.target.id.value),
      suite: event.target.suite.value,
      number: Number(event.target.number.value),
      capacity: Number(event.target.capacity.value),
    })
    event.preventDefault()
  }

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
            //onChange={handleChange}
            id="outlined-"
            label="ID"
            name="id"
            type="number"
          />
          <TextField
            //onChange={handleChange}
            id="outlined-"
            label="suite"
            name="suite"
          />
          <TextField
            // onChange={handleChange}
            id="outlined-"
            label="Number"
            name="number"
            type="number"
          />
          <TextField
            // onChange={handleChange}
            id="outlined-"
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
      <b />
      <Box sx={{ maxWidth: 350 }}>
        <Roomcard data={{ id: 1, suite: "Deluxe", number: 1, capacity: 2 }} />
      </Box>
    </div>
  )
}

export default function Room() {
  return (
    <>
      <Head>
        <title>Heyyo</title>
      </Head>
      <AddRoom />
    </>
  )
}
