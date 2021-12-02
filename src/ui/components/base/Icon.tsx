import React from "react";
import { IconName, themeIcons } from "../style/themeIcons";

export function Icon({ icon }: { icon: IconName }) {
  return <React.Fragment>{themeIcons[icon]}</React.Fragment>;
}
