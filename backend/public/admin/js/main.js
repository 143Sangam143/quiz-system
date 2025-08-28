let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

function inactiveLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
}

// list.forEach((item) => item.addEventListener("mouseover", activeLink));
list.forEach((item) => {
  item.addEventListener("mouseover", activeLink);
  item.addEventListener("mouseout", inactiveLink);
});

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigations = document.querySelectorAll(".navigation");
let main = document.querySelector(".main");
let topbar = document.querySelector(".topbar");


toggle.onclick = function () {
  navigations.forEach(navigation => {
    navigation.classList.toggle("active");
  });
  main.classList.toggle("active");
  topbar.classList.toggle("active");

};