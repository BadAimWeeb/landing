import { Link, Text } from "@radix-ui/themes";
import cls from "./Footer.module.scss";
import logo from "./../assets/images/baw.svg";

export default function Footer() {
    return (
        <div className={cls.Footer}>
            <div className={cls.Inner}>
                <img srcSet={logo} alt="logo" className={cls.Logo} />
                <div className={cls.Content}>
                    <Text size="1" color="gray">
                        Website created with <Link color="gray" href="https://vite.dev/guide/#scaffolding-your-first-vite-project" target="_blank">Vite + React</Link>. Huohuo illustration from official <Link color="gray" href="https://hsr.hoyoverse.com/en-us/home" target="_blank">HSR</Link> sticker pack, © COGNOSPHERE PTE. LTD.
                    </Text><br />
                    <Text size="1" color="gray">
                        this site is definitely "not" completely ripped off from <Link color="gray" href="https://michioxd.ch" target="_blank">michioxd</Link> lol (i cannot cook frontend nice enough).<br />
                        2025 © BadAimWeeb & michioxd @ BAW-TX. <Link color="gray" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</Link>.
                    </Text>
                </div>
            </div>
        </div>
    )
}