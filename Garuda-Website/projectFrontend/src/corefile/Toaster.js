import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseover", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Toast1 = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,

  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseover", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Toast2 = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseover", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const makeToast = (type, msg) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

const makeToast1 = (type, msg, time) => {
  Toast1.fire({
    icon: type,
    title: msg,
    timer: time,
    position: "bottom-left",
  });
};

const makeToast2 = (type, msg, time) => {
  Toast2.fire({
    icon: type,
    title: msg,
    timer: time,
  });
};

const makeNotify = (type, heading, message) => {
  Swal.fire({
    icon: type,
    title: heading,
    text: message,
  });
};

export { makeToast2, makeToast1, makeToast, makeNotify };
