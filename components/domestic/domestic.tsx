import React, { useState, useEffect } from "react";
import Categories from "../categories";
import Leagues from "./Leagues";

import { IMatchProps } from "@/repositories/data";
import Item from "../betslip/Item";

// const BetSlip = React.lazy(() => import("../betslip/betslip"));
// const Categories = React.lazy(() => import("../categories"));
// const Leagues = React.lazy(() => import("./Leagues"));
export interface IDomesticProps {
  matchesData: any;
  onMessage?: () => void;
}

const Domestic: React.FC<IDomesticProps> = (props) => {
  return (
    <React.Fragment>
      <Categories title="스포츠 (국내형)" />
      <Leagues matchesData={props.matchesData} />
    </React.Fragment>
  );
};

export default Domestic;
