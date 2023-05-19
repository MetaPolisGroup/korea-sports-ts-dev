import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import classes from "./Card.module.css";
import Button from "@mui/material/Button";
import { slotProviderList } from "@/data";
import { useRouter } from "next/router";

const Cards = () => {
  const router = useRouter();
  const handleProvider = (id: string) => {
    router.push(`/slot-provider/${id}/slot-game`);
  };

  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        justifyContent: "center",
        overflowY: "scroll",
      }}
      height={700}
    >
      {slotProviderList.map((provider) => (
        <div className={classes["provider-card"]} key={provider.id}>
          <div className={classes["provider-overlay"]}>
            {/* <Image
              src={provider.provider_img}
              width={250}
              height={195}
              alt={provider.name}
              style={{ objectFit: "cover" }}
            /> */}
          </div>
          <div className={classes["content-overlay"]}>
            <Image
              src={provider.provider_logo}
              width={75}
              height={20}
              alt={provider.name}
            />
            <Button
              variant="contained"
              className={classes["btnInCard"]}
              onClick={() => {
                handleProvider(provider.id);
              }}
            >
              게임보기
            </Button>
          </div>
          <Card sx={{ maxWidth: 250, cursor: "pointer" }}>
            <CardMedia src="" sx={{ height: 145 }}>
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  src={provider.provider_img}
                  width={250}
                  height={145}
                  alt={provider.name}
                />
              </div>
            </CardMedia>
            <Box
              display={"flex"}
              justifyContent="space-around"
              alignItems="center"
              bgcolor="#0d1c2b"
              height={50}
            >
              <Image
                src={provider.provider_logo}
                width={75}
                height={20}
                alt="evonlay"
                style={{ objectFit: "cover" }}
              />
              <Typography variant="subtitle2" color="#fff" component="div">
                {provider.name}
              </Typography>
            </Box>
          </Card>
        </div>
      ))}
    </Box>
  );
};

export default Cards;
