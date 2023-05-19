import MenuIcon from "@mui/icons-material/Menu";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import HistoryIcon from "@mui/icons-material/History";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import BallotIcon from "@mui/icons-material/Ballot";

import { ECategories } from "@/store/Category/type";
export const leagues = [
  {
    id: "lg0",
    imgIcon: "images/games/base-ball.svg",
    leagueName: "KBO",
    leagueQuanlity: 5,
  },
  {
    id: "lg1",
    imgIcon: "images/games/base-ball.svg",
    leagueName: "NPB",
    leagueQuanlity: 5,
  },
  {
    id: "lg2",
    imgIcon: "images/games/base-ball.svg",
    leagueName: "MLB",
    leagueQuanlity: 5,
  },
  {
    id: "lg3",
    imgIcon: "images/games/volleyball_inactive.svg",
    leagueName: "NBA",
    leagueQuanlity: 5,
  },
  {
    id: "lg4",
    imgIcon: "images/games/ball-icon.svg",
    leagueName: "UEFA Champions League",
    leagueQuanlity: 5,
  },
  {
    id: "lg5",
    imgIcon: "images/games/ball-icon.svg",
    leagueName: "UEFA Europa League",
    leagueQuanlity: 5,
  },
  {
    id: "lg6",
    imgIcon: "images/games/ball-icon.svg",
    leagueName: "Premier League",
    leagueQuanlity: 5,
  },
  {
    id: "lg7",
    imgIcon: "images/games/ball-icon.svg",
    leagueName: "Primera League",
    leagueQuanlity: 5,
  },
  {
    id: "lg8",
    imgIcon: "images/games/ball-icon.svg",
    leagueName: "French Ligue 1",
    leagueQuanlity: 5,
  },
  {
    id: "lg9",
    imgIcon: "images/games/ball-icon.svg",
    leagueName: "Serie A",
    leagueQuanlity: 5,
  },
  {
    id: "lg10",
    imgIcon: "images/games/ball-icon.svg",
    leagueName: "Bundesliga",
    leagueQuanlity: 5,
  },
];

export const cards = [
  {
    id: "cd0",
    image: "/images/cards/oursports.jpg",
    path: "/oversea",
  },
  {
    id: "cd1",
    image: "/images/cards/livesports.jpg",
    path: "/live",
  },
  {
    id: "cd2",
    image: "/images/cards/livecasino.jpg",
    path: "/casino",
  },
  {
    id: "cd3",
    image: "/images/cards/slotgames.jpg",
    path: "/slot-provider",
  },
  {
    id: "cd4",
    image: "/images/cards/minigames.jpg",
    path: "/virtual",
  },
];

export const leaguesLogo = [
  {
    id: "lgL0",
    image: "/images/logos_footer/league_logo-01.svg",
  },
  {
    id: "lgL1",
    image: "/images/logos_footer/league_logo-02.svg",
  },
  {
    id: "lgL2",
    image: "/images/logos_footer/league_logo-03.svg",
  },
  {
    id: "lgL3",
    image: "/images/logos_footer/league_logo-04.svg",
  },
  {
    id: "lgL4",
    image: "/images/logos_footer/league_logo-05.svg",
  },
  {
    id: "lgL5",
    image: "/images/logos_footer/league_logo-06.svg",
  },
  {
    id: "lgL6",
    image: "/images/logos_footer/league_logo-07.svg",
  },
  {
    id: "lgL7",
    image: "/images/logos_footer/league_logo-08.svg",
  },
  {
    id: "lgL8",
    image: "/images/logos_footer/league_logo-09.svg",
  },
  {
    id: "lgL9",
    image: "/images/logos_footer/league_logo-10.svg",
  },
  {
    id: "lgL10",
    image: "/images/logos_footer/league_logo-11.svg",
  },
  {
    id: "lgL11",
    image: "/images/logos_footer/league_logo-12.svg",
  },
  {
    id: "lgL12",
    image: "/images/logos_footer/league_logo-13.svg",
  },
  {
    id: "lgL13",
    image: "/images/logos_footer/league_logo-14.svg",
  },
  {
    id: "lgL14",
    image: "/images/logos_footer/league_logo-15.svg",
  },
  {
    id: "lgL15",
    image: "/images/logos_footer/league_logo-16.svg",
  },
  {
    id: "lgL16",
    image: "/images/logos_footer/league_logo-17.svg",
  },
  {
    id: "lgL17",
    image: "/images/logos_footer/league_logo-18.svg",
  },
  {
    id: "lgL18",
    image: "/images/logos_footer/league_logo-19.svg",
  },
  {
    id: "lgL19",
    image: "/images/logos_footer/league_logo-20.svg",
  },
];

export const gamesType = [
  {
    id: ECategories.SOCCER,
    image: "/images/games/ball-icon_inactive.svg",
    acive_image: "/images/games/ball-icon_active.svg",
    title: "축구",
  },
  {
    id: ECategories.BASKETBALL,
    image: "/images/games/basket-ball.svg",
    acive_image: "/images/games/basket-ball_active.svg",
    title: "농구",
  },
  {
    id: ECategories.BASEBALL,
    image: "/images/games/base-ball.svg",
    acive_image: "/images/games/base-ball_active.svg",
    title: "야구",
  },
  {
    id: ECategories.ICEHOCKEY,
    image: "/images/games/ice-hockey.svg",
    acive_image: "/images/games/ice-hockey_active.svg",
    title: "아이스 하키",
  },
  {
    id: ECategories.VOLLEYBALL,
    image: "/images/games/volleyball_inactive.svg",
    acive_image: "/images/games/volleyball_active.svg",
    title: "배구",
  },
  {
    id: ECategories.AMERICANFOOTBALL,
    image: "/images/games/america-football.svg",
    acive_image: "/images/games/america-football_active.svg",
    title: "미식축구",
  },
];

export const subMenuFooter = {
  default: [
    {
      id: "sub1",
      icon: <HeadphonesIcon />,
      title: "고객센터",
      path: "/customer-service",
    },
    {
      id: "sub2",
      icon: <CurrencyExchangeIcon />,
      title: "충전",
      path: "/deposit",
    },
    {
      id: "sub3",
      icon: <AttachMoneyIcon />,
      title: "환전",
      path: "/withdraw",
    },
    {
      id: "sub4",
      icon: <HistoryIcon />,
      title: "환전",
      path: "/history",
    },
  ],

  sports: [
    {
      id: "sub1",
      icon: <MenuIcon />,
      title: "스포츠",
      typeAction: "SPORT",
    },
    {
      id: "sub2",
      icon: <HeadphonesIcon />,
      title: "고객센터",
      path: "/customer-service",
    },

  ],

  casino: [
    {
      id: "sub1",
      icon: <MenuIcon />,
      title: "바카라",
      typeAction: "CASINO",
    },
    {
      id: "sub2",
      icon: <HeadphonesIcon />,
      title: "고객센터",
      path: "/customer-service",
    },
    {
      id: "sub3",
      icon: <CurrencyExchangeIcon />,
      title: "충전",
      path: "/deposit",
    },
    {
      id: "sub4",
      icon: <HistoryIcon />,
      title: "환전",
      path: "/history",
    },
  ],
};

export const slotgames = [
  {
    id: "g1",
    image: "/images/slots/ladywolf.jpeg",
    name: "Lady Wolf Moon",
    link: "/",
  },
  {
    id: "g2",
    image: "/images/slots/aztec-magic-bonanz.jpeg",
    name: "Aztec Magic Bonanza",
    link: "/",
  },
  {
    id: "g3",
    image: "/images/slots/BetfuryMillion.jpeg",
    name: "Betfury Million",
    link: "/",
  },
  {
    id: "g4",
    image: "/images/slots/AztecMagicDeluxe.jpeg",
    name: "Aztec Magic Deluxe",
    link: "/",
  },
  {
    id: "g5",
    image: "/images/slots/BetFurySpaceBonanza.jpeg",
    name: "BetFury Space Bonanza",
    link: "/",
  },
  {
    id: "g6",
    image: "/images/slots/BonanzaBillion.jpeg",
    name: "Bonanza Billion",
    link: "/",
  },
  {
    id: "g7",
    image: "/images/slots/SunofEgypt3.jpeg",
    name: "Sun of Egypt 3",
    link: "/",
  },
  {
    id: "g8",
    image: "/images/slots/BookofSun.jpeg",
    name: "Book of Sun",
    link: "/",
  },
  {
    id: "g9",
    image: "/images/slots/AztecFire.jpeg",
    name: "Aztec Fire",
    link: "/",
  },
  {
    id: "g10",
    image: "/images/slots/GreenChilly.jpeg",
    name: "Green Chilly",
    link: "/",
  },
  {
    id: "g11",
    image: "/images/slots/StickyPiggy.jpeg",
    name: "Sticky Piggy",
    link: "/",
  },
  {
    id: "g12",
    image: "/images/slots/Geisha.jpeg",
    name: "Geisha",
    link: "/",
  },
  {
    id: "g13",
    image: "/images/slots/AncientTroy.jpeg",
    name: "Ancient Troy",
    link: "/",
  },
  {
    id: "g14",
    image: "/images/slots/FreshFruits.jpeg",
    name: "Fresh Fruits",
    link: "/",
  },
  {
    id: "g15",
    image: "/images/slots/Buffalo50.jpeg",
    name: "Buffalo 50",
    link: "/",
  },
  {
    id: "g16",
    image: "/images/slots/HellHot100.jpeg",
    name: "Hell Hot 100",
    link: "/",
  },
  {
    id: "g17",
    image: "/images/slots/JokerStoker.jpeg",
    name: "Joker Stoker",
    link: "/",
  },
  {
    id: "g18",
    image: "/images/slots/ScarabBoost.jpeg",
    name: "Scarab Boost",
    link: "/",
  },
];

export const slotProviderList = [
  {
    id: "spl0",
    provider_img: "/images/slots-game/evoplay.jpg",
    provider_logo: "/images/slots-game/evoplay.png",
    name: "에보플레이",
  },
  {
    id: "spl1",
    provider_img: "/images/slots-game/pragmatic.jpg",
    provider_logo: "/images/slots-game/pragmatic.png",
    name: "프라그매틱 플레이",
  },
  {
    id: "spl2",
    provider_img: "/images/slots-game/bng.jpg",
    provider_logo: "/images/slots-game/bng.png",
    name: "부운고",
  },
  {
    id: "spl3",
    provider_img: "/images/slots-game/wazdan.jpg",
    provider_logo: "/images/slots-game/wazdan.png",
    name: "와즈단",
  },
  {
    id: "spl4",
    provider_img: "/images/slots-game/netent.jpg",
    provider_logo: "/images/slots-game/netent.png",
    name: "넷엔트",
  },
  {
    id: "spl5",
    provider_img: "/images/slots-game/redtiger.jpg",
    provider_logo: "/images/slots-game/redtiger.png",
    name: "레드타이거",
  },
  {
    id: "spl6",
    provider_img: "/images/slots-game/playson.jpg",
    provider_logo: "/images/slots-game/playson.png",
    name: "플레이슨",
  },
  {
    id: "spl7",
    provider_img: "/images/slots-game/evoplay.jpg",
    provider_logo: "/images/slots-game/evoplay.png",
    name: "에보플레이",
  },
  {
    id: "spl8",
    provider_img: "/images/slots-game/habanero.jpg",
    provider_logo: "/images/slots-game/habanero.png",
    name: "하바네로",
  },
  {
    id: "spl9",
    provider_img: "/images/slots-game/relax.jpg",
    provider_logo: "/images/slots-game/relax.png",
    name: "릴렉스 게이밍",
  },
  {
    id: "spl10",
    provider_img: "/images/slots-game/tpg.jpg",
    provider_logo: "/images/slots-game/tpg.png",
    name: "티피지",
  },
  {
    id: "sp11",
    provider_img: "/images/slots-game/gameart.jpg",
    provider_logo: "/images/slots-game/gameart.png",
    name: "게임아트",
  },
  {
    id: "spl12",
    provider_img: "/images/slots-game/cq9.jpg",
    provider_logo: "/images/slots-game/cq9.png",
    name: "시큐나인",
  },
  {
    id: "spl13",
    provider_img: "/images/slots-game/playstar.jpg",
    provider_logo: "/images/slots-game/playstar.png",
    name: "플레이스타",
  },
  {
    id: "spl14",
    provider_img: "/images/slots-game/blueprint.jpg",
    provider_logo: "/images/slots-game/blueprint.png",
    name: "블루프린트",
  },
  {
    id: "spl15",
    provider_img: "/images/slots-game/bigtime.jpg",
    provider_logo: "/images/slots-game/bigtime.png",
    name: "빅타임 게이밍",
  },
  {
    id: "spl16",
    provider_img: "/images/slots-game/thunderkick.jpg",
    provider_logo: "/images/slots-game/thunderkick.png",
    name: "썬더킥",
  },
  {
    id: "spl17",
    provider_img: "/images/slots-game/nolimit.jpg",
    provider_logo: "/images/slots-game/nolimit.png",
    name: "노리밋 시티",
  },
  {
    id: "spl18",
    provider_img: "/images/slots-game/mobilots.jpg",
    provider_logo: "/images/slots-game/mobilots.png",
    name: "모빌랏스",
  },
  {
    id: "spl19",
    provider_img: "/images/slots-game/playpearl.jpg",
    provider_logo: "/images/slots-game/playpearl.png",
    name: "플레이펄즈",
  },
  {
    id: "spl20",
    provider_img: "/images/slots-game/dragonsoft.jpg",
    provider_logo: "/images/slots-game/dragonsoft.png",
    name: "드라군 소프트",
  },
  {
    id: "spl21",
    provider_img: "/images/slots-game/onebytwo.jpg",
    provider_logo: "/images/slots-game/onebytwo.png",
    name: "1X2 게이밍",
  },
  {
    id: "spl22",
    provider_img: "/images/slots-game/elk.jpg",
    provider_logo: "/images/slots-game/elk.png",
    name: "엘크 스튜디오",
  },
  {
    id: "spl23",
    provider_img: "/images/slots-game/microgaming.jpg",
    provider_logo: "/images/slots-game/microgaming.png",
    name: "마이크로 게이밍 플러스",
  },
];

export const subMenuSlotGame = [
  { id: 1, name: "프라그마틱", url: "/" },
  { id: 2, name: "프라그마틱", url: "/" },
  { id: 3, name: "부운고", url: "/" },
  { id: 4, name: "레드타이거", url: "/" },
  { id: 5, name: "넷 엔트", url: "/" },
  { id: 6, name: "릴렉스", url: "/" },
  { id: 7, name: "게임아트", url: "/" },
  { id: 8, name: "블루프린트", url: "/" },
  { id: 9, name: "벳소프트", url: "/" },
  { id: 10, name: "BGT", url: "/" },
  { id: 11, name: "릴킹덤", url: "/" },
  { id: 12, name: "드래곤소프트", url: "/" },
  { id: 13, name: "엘리시움", url: "/" },
  { id: 14, name: "마이크로게이밍", url: "/" },
  { id: 15, name: "퀵스핀", url: "/" },
  { id: 16, name: "레드레이크", url: "/" },
  { id: 17, name: "스피어헤드", url: "/" },
  { id: 18, name: "넥스트스핀", url: "/" },
  { id: 19, name: "넷게이밍", url: "/" },
  { id: 20, name: "푼타게이밍", url: "/" },
  { id: 21, name: "나가게이밍", url: "/" },
  { id: 22, name: "에스펙", url: "/" },
  { id: 23, name: "플레이스타", url: "/" },
  { id: 24, name: "플레이앤고", url: "/" },
  { id: 25, name: "노리밋시티", url: "/" },
  { id: 26, name: "핵쏘우", url: "/" },
  { id: 27, name: "아바타UX", url: "/" },
  { id: 28, name: "플레이손", url: "/" },
  { id: 29, name: "PGSoft", url: "/" },
  { id: 30, name: "하바네로", url: "/" },
  { id: 31, name: "GM", url: "/" },
];

export const subMenuCasino = [
  { id: 1, name: "바카라", url: "/" },
  { id: 2, name: "에볼루션", url: "/" },
  { id: 3, name: "프라그마틱", url: "/" },
  { id: 4, name: "CQ9카지노", url: "/" },
  { id: 5, name: "모티베이션", url: "/" },
  { id: 6, name: "WM카지노", url: "/" },
  { id: 7, name: "마이크로게이밍", url: "/" },
  { id: 8, name: "보타카지노", url: "/" },
  { id: 9, name: "오리엔탈", url: "/" },
  { id: 10, name: "비보게이밍", url: "/" },
  { id: 11, name: "빅게이밍", url: "/" },
];

export const subMenuMiniGame = [
  {
    id: 0,
    name: "비트코인사다리",
    url: "/",
  },
  {
    id: 1,
    name: "비트코인파워볼",
    url: "/",
  },
  {
    id: 2,
    name: "보글사다리",
    url: "/",
  },
  {
    id: 3,
    name: "보글파워볼",
    url: "/",
  },
  {
    id: 4,
    name: "코인3사다리",
    url: "/",
  },
  {
    id: 5,
    name: "코인3파워볼",
    url: "/",
  },
  {
    id: 6,
    name: "코인5사다리",
    url: "/",
  },
  {
    id: 7,
    name: "코인5파워볼",
    url: "/",
  },
  {
    id: 8,
    name: "별사다리1분",
    url: "/",
  },
  {
    id: 9,
    name: "별사다리2분",
    url: "/",
  },
  {
    id: 10,
    name: "별사다리3분",
    url: "/",
  },
];

export const subMenuVirtual = [];

export const minigames = [
  {
    id: "mg0",
    image: "/images/minigames/main_gamebitladder.png",
    name: "비트코인사다리",
    url: "/",
  },
  {
    id: "mg1",
    image: "/images/minigames/main_gamebitpowerball.png",
    name: "비트코인파워볼",
    url: "/",
  },
  {
    id: "mg2",
    image: "/images/minigames/main_gameboglladder.png",
    name: "보글사다리",
    url: "/",
  },
  {
    id: "mg3",
    image: "/images/minigames/main_gameboglpowball.png",
    name: "보글파워볼",
    url: "/",
  },
  {
    id: "mg4",
    image: "/images/minigames/main_gamecoin3ladder.png",
    name: "코인3사다리",
    url: "/",
  },
  {
    id: "mg5",
    image: "/images/minigames/main_gamecoin3powerball.png",
    nanme: "코인3파워볼",
    url: "/",
  },
  {
    id: "mg6",
    image: "/images/minigames/main_gamecoin5ladder.png",
    name: "코인5사다리",
    url: "/",
  },
  {
    id: "mg7",
    image: "/images/minigames/main_gamecoin5powerball.png",
    name: "코인5파워볼",
    url: "/",
  },
  {
    id: "mg8",
    image: "/images/minigames/main_gamestar1ladder.png",
    name: "별사다리1분",
    url: "/",
  },
  {
    id: "mg9",
    image: "/images/minigames/main_gamestar2ladder.png",
    name: "별사다리2분",
    url: "/",
  },
  {
    id: "mg10",
    image: "/images/minigames/main_gamestar3ladder.png",
    name: "별사다리3분",
    url: "/",
  },
];

export const casinoGames = [
  {
    id: "c1",
    image: "/images/casino/casino_img1.jpg",
    name: "에볼루션",
    link: "/",
  },
  {
    id: "c2",
    image: "/images/casino/casino_img2.jpg",
    name: "프라그마틱",
    link: "/",
  },
  {
    id: "c3",
    image: "/images/casino/casino_img3.jpg",
    name: "CQ9카지노",
    link: "/",
  },
  {
    id: "c4",
    image: "/images/casino/casino_img4.jpg",
    name: "모티베이션",
    link: "/",
  },
  {
    id: "c5",
    image: "/images/casino/casino_img3.jpg",
    name: "WM카지노",
    link: "/",
  },
  {
    id: "c6",
    image: "/images/casino/casino_img5.jpg",
    name: "마이크로게이밍",
    link: "/",
  },
  {
    id: "c7",
    image: "/images/casino/casino_img5.jpg",
    name: "보타카지노",
    link: "/",
  },
  {
    id: "c8",
    image: "/images/casino/casino_img6.jpg",
    name: "오리엔탈",
    link: "/",
  },
  {
    id: "c9",
    image: "/images/casino/casino_img7.jpg",
    name: "비보게이밍",
    link: "/",
  },
  {
    id: "c10",
    image: "/images/casino/casino_img8.jpg",
    name: "빅게이밍",
    link: "/",
  },
];

export const FakeDataVirtual = [
  {
    id: "virtual1",
    title: {
      title: "파워볼",
      content: "숫자 기준",
      color: "#ffff66",
    },
    subTitle: [
      {
        content: "홀/짝 | 오버/언더",
        odd: 4.5,
      },
    ],
    mode: "ROUND",
    odds: [
      {
        id: "odd1",
        name: "홀",
        value: 1.95,
      },
      {
        id: "odd2",
        name: "짝",
        value: 1.95,
      },
      {
        id: "odd3",
        name: "오버",
        value: 1.95,
      },
      {
        id: "odd4",
        name: "언더",
        value: 1.95,
      },
    ],
  },
  {
    id: "virtual2",
    title: {
      title: "일반볼",
      content: "숫자합 기준",
      color: "#ffff66",
    },
    subTitle: [
      {
        content: "홀/짝 | 오버/언더",
        odd: 72.5,
      },
      {
        content: "소중대",
        odd: "소15~64 / 중65~80 / 대81~130",
      },
    ],
    mode: "ROUND",
    odds: [
      {
        id: "odd5",
        name: "홀",
        value: 1.95,
      },
      {
        id: "odd6",
        name: "짝",
        value: 1.95,
      },
      {
        id: "odd7",
        name: "오버",
        value: 1.95,
      },
      {
        id: "odd8",
        name: "언더",
        value: 1.95,
      },
    ],
  },
  {
    id: "virtual3",
    title: {
      title: "파워볼 조합",
      content: "",
      color: "#66ff00",
    },
    subTitle: [
      {
        content: "홀/짝 + 오버/언더 결과 조합",
        odd: null,
      },
    ],
    mode: "SQUARE",
    odds: [
      {
        id: "odd9",
        name: "홀+언",
        value: null,
      },
      {
        id: "odd10",
        name: "홀+오버",
        value: null,
      },
      {
        id: "odd11",
        name: "짝+언더",
        value: null,
      },
      {
        id: "odd12",
        name: "짝+오버",
        value: null,
      },
    ],
  },
  {
    id: "virtual4",
    title: {
      title: "일반볼 조합 ",
      content: "",
      color: "#66ff00",
    },
    subTitle: [
      {
        content: "홀/짝 + 오버/언더 결과 조합",
        odd: null,
      },
    ],
    mode: "SQUARE",
    odds: [
      {
        id: "odd13",
        name: "홀+오버",
        value: 3.5,
      },
      {
        id: "odd14",
        name: "짝+오버",
        value: 3.5,
      },
      {
        id: "odd15",
        name: "홀+언더",
        value: 3.5,
      },
      {
        id: "odd16",
        name: "짝+언더",
        value: 3.5,
      },
    ],
  },
  {
    id: "virtual5",
    title: {
      title: "파워볼 +일반볼 조합",
      content: "",
      color: "#66ff00",
    },
    subTitle: [
      {
        content: "파 홀/짝 + 오버/언더 결과 조합",
        odd: null,
      },
    ],
    mode: "",
    odds: [
      {
        id: "odd1",
        name: "",
        value: 0,
      },
      {
        id: "odd2",
        name: "",
        value: 0,
      },
      {
        id: "odd3",
        name: "",
        value: 0,
      },
      {
        id: "odd4",
        name: "",
        value: 0,
      },
    ],
  },
  {
    id: "virtual",
    title: {
      title: "",
      content: "",
      color: "",
    },
    subTitle: [
      {
        content: "",
        odd: 0,
      },
      {
        content: "",
        odd: 0,
      },
    ],
    mode: "",
    odds: [
      {
        id: "odd1",
        name: "",
        value: 0,
      },
      {
        id: "odd2",
        name: "",
        value: 0,
      },
      {
        id: "odd3",
        name: "",
        value: 0,
      },
      {
        id: "odd4",
        name: "",
        value: 0,
      },
    ],
  },
];

export const BankName = [
  {
    id: "bank1",
    label: "신한은행",
    value: "신한",
  },
  {
    id: "bank2",
    label: "국민은행",
    value: "국민",
  },
  {
    id: "bank3",
    label: "농협은행",
    value: "농협",
  },
  {
    id: "bank4",
    label: "우리은행",
    value: "우리",
  },
  {
    id: "bank5",
    label: "하나은행",
    value: "하나",
  },
  {
    id: "bank6",
    label: "제일은행",
    value: "제일",
  },
  {
    id: "bank7",
    label: "기업은행",
    value: "기업",
  },
  {
    id: "bank8",
    label: "우체국",
    value: "우체국",
  },
  {
    id: "bank9",
    label: "경남은행",
    value: "경남",
  },
  {
    id: "bank10",
    label: "광주은행",
    value: "광주",
  },
  {
    id: "bank11",
    label: "대구은행",
    value: "대구",
  },
  {
    id: "bank12",
    label: "부산은행",
    value: "부산",
  },
  {
    id: "bank13",
    label: "산림은행",
    value: "산림",
  },
  {
    id: "bank14",
    label: "산업은행",
    value: "산업",
  },
  {
    id: "bank15",
    label: "수협은행",
    value: "수협",
  },
  {
    id: "bank16",
    label: "지역농축협",
    value: "지역농축협",
  },
  {
    id: "bank17",
    label: "전북은행",
    value: "전북",
  },
  {
    id: "bank18",
    label: "제주은행",
    value: "제주",
  },
  {
    id: "bank19",
    label: "씨티은행",
    value: "씨티",
  },
  {
    id: "bank20",
    label: "새마을금고",
    value: "새마을",
  },
  {
    id: "bank21",
    label: "신용협동",
    value: "신용협동",
  },
  {
    id: "bank22",
    label: "카카오뱅크",
    value: "카카오뱅크",
  },
];
