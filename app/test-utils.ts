import { Ctx } from "blitz"

export const customerCtx: Ctx = {
  user: {
    id: "12738d5e-9f17-4c48-bf1c-e7ec33ee3904",
    role: "CUSTOMER",
    email: "Dayne.Nienow@hotmail.com",
    name: "Danielle Tremblay MD",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/matthew_d_green/128.jpg",
  },
}

export const managerCtx: Ctx = {
  user: {
    id: "cl1uqqr4a0010jn0gn0rssejh",
    role: "MANAGER",
    email: "tnfssc@gmail.com",
    name: "Sharath Chandra",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/matthew_d_green/128.jpg",
  },
}
