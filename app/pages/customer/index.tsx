import { Head, useMutation, useQuery } from "blitz"
import addEditCustomer from "app/customers/mutations/addEditCustomer"
import availableRooms from "app/reservations/queries/availableRooms"
import CustomerCard from "../utilities/customerCard"
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

export default function Customers() {
  const [open, setOpen] = React.useState(false)
  const [mutation] = useMutation(addEditCustomer)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (event) => {
    mutation({
      id: Number(event.target.id.value),
      firstName: event.target.name.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
    })

    event.preventDefault()
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Custommer
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Customer Details
        </BootstrapDialogTitle>

        <form style={{ margin: 10 }} onSubmit={handleSubmit}>
          <TextField
            //onChange={handleChange}

            label="ID"
            name="id"
          />
          <TextField
            //onChange={handleChange}

            label="Name"
            name="name"
          />
          <TextField
            // onChange={handleChange}

            label="Mobile Number"
            name="phone"
          />
          <TextField
            // onChange={handleChange}

            label="Email"
            name="email"
          />

          <DialogActions>
            <Button autoFocus type="submit" value="Submit" onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      <break />

      <Box sx={{ width: 340 }}>
        <CustomerCard
          data={{ id: 2, name: "Raviteja Namani", number: "9381629505", email: "ravi@xyz" }}
        />
      </Box>
    </div>
  )
}
