import React from "react";
import Image from "next/image";
import classes from "./SportLogo.module.css";
import { ILogos } from "@/repositories/data";

interface SportLogo {
  dataLogosFooter: ILogos[];
}

const SportLogo: React.FC<SportLogo> = (props) => {
  // const renderListLogo = useMemo(() => {
  //   return props?.dataLogosFooter?.map((item) => (
  //     <Image
  //       key={item.id}
  //       src={item.image}
  //       alt="logo"
  //       priority
  //       width={180}
  //       height={80}
  //     />
  //   ));
  // }, [props?.dataLogosFooter]);

  return (
    <div>
      <div className={classes.boxLogo}>
        {props?.dataLogosFooter?.map((item) => (
          <Image
            key={item.id}
            src={item.image}
            alt="logo"
            width={60}
            height={40}
            loading="lazy"
            // style={{ objectFit: "cover" }}
          />
        ))}
      </div>
    </div>
  );
};

export default SportLogo;
