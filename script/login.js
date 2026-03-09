let btn = document.querySelector(".btn").addEventListener("click", () => {
  let usernameInput = document.querySelector(".usernameInput").value;
  let inputpassword = document.querySelector(".inputpassword").value;

  if (usernameInput.length !== 5) {
    alert("Please Enter your Valid UserName");
    return;
  }
  if (inputpassword.length < 8) {
    alert("Please Password Minimum 8 digit");
    return;
  }

  if (!(usernameInput == "admin" && inputpassword == "admin123")) {
    alert("Please Enter your Valid Userid or Password");
  } else {
    window.location.assign("home.html");
  }
});
