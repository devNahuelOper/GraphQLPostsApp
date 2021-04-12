mutation RegisterUser {
  register(name: "Randy Marsh", email: "tegridy_farms@yahoo.com", password: "tegridy") {
    id
    name
    email
  }
}