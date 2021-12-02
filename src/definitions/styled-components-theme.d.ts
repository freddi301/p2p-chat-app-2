import "styled-components";
type Theme = import("../ui/components/style/theme").Theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
