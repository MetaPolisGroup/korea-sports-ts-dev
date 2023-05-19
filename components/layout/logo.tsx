import Image from "next/image";
import React from "react";
import classes from "./logo.module.css";
import Link from "next/link";

const Logo = () => {
  return (
    <div className={classes.logo}>
      <Link href="/sports">
        <Image
          src="/images/logos/danang_og.svg"
          alt="Logo"
          width={160}
          height={30}
        />
      </Link>
    </div>
  );
};

export default Logo;
