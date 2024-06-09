const email123 = document.querySelector(".dropdown-email");
const logOut = document.querySelector(".header-dropdown-item:last-child ");
const isUser = JSON.parse(
  sessionStorage.getItem(
    "firebase:authUser:AIzaSyDUbcv-liaVM31knz9Z4Cc6XA58Pn6XOYs:[DEFAULT]"
  )
);
console.log(isUser.email);
if (isUser === null) {
  window.location.href = "../html/signIn.html";
}
console.log();

logOut.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "../html/signIn.html";
    })
    .catch((error) => {});
});

email123.textContent = isUser.email;
