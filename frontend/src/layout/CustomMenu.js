// Sidebar importer
import {
    UilEstate,
    UilNewspaper,
    UilPackage,
    UilChart,
    UilUsdSquare,
    UilMoneyWithdrawal,
    UilUserMd,
    UilFileMedical,
    UilClipboardAlt
} from "@iconscout/react-unicons";

export const CustomMenu=[
    {
        icon: UilEstate,
        heading: "Accueil",
        path: "/home",
        name: "Home",
        key:"/home",
    },
    {
        icon: UilFileMedical,
        heading: "Client",
        path: "/Client",
        name: "client",
        key: "/client"
    },
    {
        icon: UilNewspaper,
        heading: "Produit",
        path: "/produit",
        name: "produit",
        key: "/produit"
    },
    {
        icon: UilPackage,
        heading: "Achat",
        path: "/achat",
        name: "Achat",
        key: "/achat"
    },
    {
        icon: UilChart,
        heading: "Cité",
        path: "/cite",
        name: "cite",
        key: "/cite"
    },
    {
        icon: UilUserMd,
        heading: "Agence",
        path: "/user",
        name: "List User",
        key: "/user"
    },

];

export const CardsData =[
    {
        title: "Sales",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name:"Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },

    {
        title: "Revenue",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
                name:"Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },

    {
        title: "Expenses",
        color: {
            backGround: "linear-gradient(rgb(248, 212,154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "25,970",
        png: UilClipboardAlt,
        series: [
            {
                name:"Expenses",
                data: [10, 25, 15, 30, 42, 15, 20],
            },
        ],
    },
]