import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

export type IconName = keyof typeof themeIcons;

export const themeIcons = {
  Create: <i className="fas fa-plus" />,
  Save: <i className="fas fa-save" />,
  Delete: <i className="fas fa-trash" />,
  Account: <i className="fas fa-user" />,
  Contacts: <i className="fas fa-address-book" />,
  Conversation: <i className="fas fa-envelope" />,
  Conversations: <i className="fas fa-comment-alt" />,
  Posts: <i className="fas fa-portrait" />,
  ReadOnly: <i className="fas fa-lock" />,
  Required: <i className="fas fa-asterisk" />,
  Close: <i className="fas fa-times" />,
  ScrollToBottom: <i className="fas fa-angle-double-down" />,
  Send: <i className="fas fa-paper-plane" />,
  Emoji: <i className="fas fa-smile" />,
  Attachment: <i className="fas fa-paperclip" />,
  QRCode: <i className="fas fa-qrcode" />,
  Back: <i className="fas fa-angle-left" />,
};
