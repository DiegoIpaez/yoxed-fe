import Swal from "sweetalert2";

type MessageType = "success" | "warning" | "error";

const messageTypes = {
  success: "#339025",
  warning: "#E3A705",
  error: "#C40303",
};

const DEFAULT_PROPERTIES = {
  title: "",
  timerProgressBar: true,
  allowEscapeKey: true,
  allowOutsideClick: true,
  showConfirmButton: false,
  heightAuto: false,
  backdrop: false,
  color: "#efefef",
  background: "#efefef",
};

export const showMessage = (
  messageType: MessageType,
  text = "",
  timer = 3000
) => {
  DEFAULT_PROPERTIES.background = messageTypes[messageType];
  Swal.fire({ text, timer, position: "top", ...DEFAULT_PROPERTIES });
};
