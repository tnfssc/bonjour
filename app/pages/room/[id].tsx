import { Head, Ctx, ErrorComponent, useMutation, useQuery, useParams } from "blitz"
import { RoomType } from "db"
import addEditRoom from "../../rooms/mutations/addEditRoom.ts"
import getRooms from "../../rooms/queries/getRooms"
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
import { useSearchParams } from "react-router-dom"

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

function Reservations(props) {
  return (
    <div>
      <Box sx={{ maxWidth: 400 }}>
        {" "}
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                From: {props.checkin}
              </Typography>
              <b />
              <Typography variant="h5" component="div">
                To: {props.checkout}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </div>
  )
}

export default function Details() {
  const [query] = useQuery(getRooms, { id: 3 })
  const roomId = useParams()
  console.log(query)

  return (
    <div style={{ margin: 20 }}>
      <Head>
        <title>Heyyo</title>
      </Head>
      <Box sx={{ maxWidth: 350 }}>
        <Roomcard data={{ id: 3, capacity: 2, suite: "Deluxe", number: 3 }} />
      </Box>{" "}
      <h1>Reservations:</h1>
      <b></b>
      <Reservations checkin="2019" checkout="2022" />
    </div>
  )
}