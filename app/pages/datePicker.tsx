import { Head, useMutation, useQuery } from "blitz"
import addEditRoom from "app/rooms/mutations/addEditRoom"
import availableRooms from "app/reservations/queries/availableRooms"
import React from "react"
import Button from "@mui/material/Button"
import Roomcard from "../utilities/Roomcard"
import { styled } from "@material-ui/core/styles"
import Dialog, { DialogProps } from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Box from "@material-ui/core/Box"
import TextField from "@material-ui/core/TextField"

export default function datePicker() {
  return (
    <>
      <Head>
        <title>Our App</title>
      </Head>
    </>
  )
}
