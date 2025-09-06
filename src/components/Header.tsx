import { DropdownMenu, IconButton } from "@radix-ui/themes";
import clsx from "clsx";
import cls from "./Header.module.scss";
import Huohuo from "./../assets/images/huohuo.svg";
import { Link } from "react-scroll";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const routesMain = [
    {
        name: "home",
        id: "home"
    },
    {
        name: 'about',
        id: 'about-me'
    },
    {
        name: "skills",
        id: "my-skills"
    },
    {
        name: 'projects',
        id: 'my-projects'
    },
    {
        name: 'contact',
        id: 'contact-me'
    }
]

export default function Header({ type }: { type: "main" | "dn42" }) {
    const [showBg, setShowBg] = useState(false);

    useEffect(() => {
        function ScrollEvent() {
            if (window.scrollY >= 40) {
                setShowBg(true);
            } else {
                setShowBg(false);
            }
        }
        window.addEventListener("scroll", ScrollEvent);

        return () => {
            window.removeEventListener("scroll", ScrollEvent);
        }
    }, []);

    return (
        <div className={clsx(cls.Header, showBg && cls.bg)}>
            <div className={cls.Inner}>
                <Link to="home" duration={500} smooth>
                    <IconButton className={cls.HomeBtn} size="3" variant="ghost">
                        <img src={Huohuo} alt="huohuo" style={{ height: 25 }} />
                    </IconButton>
                </Link>
                <div className={cls.Nav}>
                    {type === "main" ? routesMain.map((route, index) => (
                        <Link key={index} activeClass="rt-variant-surface" className={clsx("rt-reset rt-BaseButton rt-r-size-2 rt-variant-ghost rt-Button", cls.NavBtn)} to={route.id} spy={true} smooth={true} duration={500} >
                            {route.name}
                        </Link>
                    )) : routesMain.map((route, index) => (
                        <a key={index} className={clsx("rt-reset rt-BaseButton rt-r-size-2 rt-variant-ghost rt-Button", cls.NavBtn)} href={`/#${route.id}`}>
                            {route.name}
                        </a>
                    ))}
                    {type === "dn42" ? (
                        <span className={clsx("rt-reset rt-BaseButton rt-r-size-2 rt-variant-surface rt-Button", cls.NavBtn)}>dn42</span>
                    ) : <a className={clsx("rt-reset rt-BaseButton rt-r-size-2 rt-variant-ghost rt-Button", cls.NavBtn)} href={"/dn42"}>
                        dn42
                    </a>}
                    <a className={clsx("rt-reset rt-BaseButton rt-r-size-2 rt-variant-ghost rt-Button", cls.NavBtn)} href={"https://blog.badaimweeb.me/"} target="_blank">
                        blog
                    </a>
                </div>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <IconButton className={cls.MbMenu} variant="surface">
                            <HamburgerMenuIcon />
                        </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        {type === "main" ? routesMain.map((route, index) => (
                            <Link key={index} to={route.id} spy={true} smooth={true} duration={500} >
                                <DropdownMenu.Item>{route.name}</DropdownMenu.Item>
                            </Link>
                        )) : routesMain.map((route, index) => (
                            <DropdownMenu.Item key={index}><a href={`/#${route.id}`} style={{ color: "inherit", textDecoration: "none" }}>{route.name}</a></DropdownMenu.Item>
                        ))}
                        {type === "dn42" ? (
                            <DropdownMenu.Item>dn42</DropdownMenu.Item>
                        ) : <DropdownMenu.Item><a href={"/dn42"} style={{ color: "inherit", textDecoration: "none" }}>dn42</a></DropdownMenu.Item>}
                        <DropdownMenu.Item><a href={"https://blog.badaimweeb.me/"} target="_blank" style={{ color: "inherit", textDecoration: "none" }}>blog</a></DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        </div>
    )
}