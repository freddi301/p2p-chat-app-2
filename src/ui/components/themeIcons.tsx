import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAngleDoubleDown,
  faAngleLeft,
  faAsterisk,
  faCheck,
  faCommentAlt,
  faEnvelope,
  faFileExport,
  faFileImport,
  faLock,
  faPaperclip,
  faPaperPlane,
  faPlus,
  faPortrait,
  faQrcode,
  faSave,
  faShareAlt,
  faSmile,
  faTimes,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export type IconName = keyof typeof themeIcons;

export const themeIcons = {
  Create: <FontAwesomeIcon icon={faPlus} />,
  Save: <FontAwesomeIcon icon={faSave} />,
  Delete: <FontAwesomeIcon icon={faTrash} />,
  Import: <FontAwesomeIcon icon={faFileImport} />,
  Export: <FontAwesomeIcon icon={faFileExport} />,
  Share: <FontAwesomeIcon icon={faShareAlt} />,
  Account: <FontAwesomeIcon icon={faUser} />,
  Contacts: <FontAwesomeIcon icon={faAddressBook} />,
  Conversation: <FontAwesomeIcon icon={faEnvelope} />,
  Conversations: <FontAwesomeIcon icon={faCommentAlt} />,
  Posts: <FontAwesomeIcon icon={faPortrait} />,
  ReadOnly: <FontAwesomeIcon icon={faLock} />,
  Required: <FontAwesomeIcon icon={faAsterisk} />,
  Close: <FontAwesomeIcon icon={faTimes} />,
  UseAccount: <FontAwesomeIcon icon={faCheck} />,
  ScrollToBottom: <FontAwesomeIcon icon={faAngleDoubleDown} />,
  Send: <FontAwesomeIcon icon={faPaperPlane} />,
  Emoji: <FontAwesomeIcon icon={faSmile} />,
  Attachment: <FontAwesomeIcon icon={faPaperclip} />,
  QRCode: <FontAwesomeIcon icon={faQrcode} />,
  Back: <FontAwesomeIcon icon={faAngleLeft} />,
};
