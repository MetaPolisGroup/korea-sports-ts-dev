import React, { ReactNode } from "react";

export interface INameProps {
  id: string;
  cc?: string | undefined;
  name: string;
  image_id: string;
}

export interface TypeListCard {
  id: string;
  image: string;
  path: string;
}

export type TLeagues = {
  id: string;
  imgIcon: string;
  leagueName: string;
  leagueQuanlity: number;
};

export interface GamesTypeProps {
  id: string;
  image: string;
  title: string;
}

export interface ILogos {
  id: string;
  image: string;
  link?: string;
}

export interface TMenuItemsFooter {
  id: string;
  icon: React.ReactNode;
  title: string;
  path?: string;
  typeAction?: string;
}

export interface TSubMenuFooter {
  default: TMenuItemsFooter[];
  sports: TMenuItemsFooter[];
  casino: TMenuItemsFooter[];
}
export interface IOddsProps {
  FI: string;
  asian_lines: any;
  corners: any;
  event_id: string;
  goals: any;
  half: any;
  main: any;
  minutes: any;
  schedule: any;
  specials: any;
  type: string;
}

export interface IMatchProps {
  away: INameProps;
  home: INameProps;
  id: string;
  league: INameProps;
  our_event_id?: string;
  r_id?: any;
  sport_id: string;
  ss?: any;
  time: string | number;
  time_status: string | number;
  updated_at: string | number;
}
