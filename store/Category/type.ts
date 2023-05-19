import { UNDEFINED } from "swr/_internal";

enum EAction {
  CHANGE_CATEGORY = "CHANGE_CATEGORY",
}

enum ECategories {
  SOCCER = "1",
  BASKETBALL = "18",
  VOLLEYBALL = "91",
  BASEBALL = "16",
  ICEHOCKEY = "17",
  AMERICANFOOTBALL = "12",
  UNDEFINED = "",
}

export { EAction, ECategories };
