import { ParallaxBanner } from "react-scroll-parallax";
import cls from "./Home.module.scss";
import Huohuo from "./../assets/images/huohuo.svg";
import { Element, Link as LinkScroll } from 'react-scroll'
import { Badge, Button, Card, Grid, Heading, IconButton, Link, Text, Tooltip } from "@radix-ui/themes";
import { PiCodeDuotone, PiDiscordLogoDuotone, PiEnvelopeDuotone, PiGithubLogoDuotone, PiInfoDuotone, PiMagicWandDuotone, PiPhoneCallDuotone, PiFacebookLogoDuotone, PiMatrixLogoDuotone } from "react-icons/pi";
import type { accentColors } from "@radix-ui/themes/props";

type AccentColors = (typeof accentColors)[number];

import tsIcon from "./../assets/icons/ts.svg";
import jsIcon from "./../assets/icons/js.svg";
import nodeJSIcon from "./../assets/icons/node-js.svg";
import rustIcon from "./../assets/icons/rust.svg";
import reactIcon from "./../assets/icons/react.svg";
import csIcon from "./../assets/icons/cs.svg";
import javaIcon from "./../assets/icons/java.svg";
import cppIcon from "./../assets/icons/cpp.svg";

import GSVN from "./../assets/projects/gamestorevn.com_.webp";
import EMC2 from "./../assets/projects/emc2.png";

const ListSocial = [
    {
        name: "Matrix",
        icon: <PiMatrixLogoDuotone size={25} />,
        url: "https://matrix.to/#/@badaimweeb:matrix.org"
    },
    {
        name: "Discord",
        icon: <PiDiscordLogoDuotone size={25} />,
        url: "https://discord.gg/uF9gxYveek"
    },
    {
        name: "Email",
        icon: <PiEnvelopeDuotone size={25} />,
        url: "mailto:x@badaimweeb.me"
    },
    {
        name: "GitHub",
        icon: <PiGithubLogoDuotone size={25} />,
        url: "https://github.com/BadAimWeeb"
    },
    {
        name: "Facebook",
        icon: <PiFacebookLogoDuotone size={25} />,
        url: "https://github.com/BadAimWeeb"
    },
];

const List = [
    {
        image: "",
        name: "BAW#ID",
        type: "Web",
        tech: [
            "React",
            "TypeScript"
        ],
        description: "identity service for all my web stuff. openid coming soon™.",
        buttons: [
            {
                name: "Website",
                url: "https://id.badaimweeb.me"
            }
        ]
    },
    {
        image: "",
        name: "bird-lg-extended",
        type: "Software/Web",
        tech: [
            "TypeScript",
            "Next.js"
        ],
        description: "a new web interface for bird-lg, which is a web frontend for BIRD (BIRD Internet Routing Daemon).",
        buttons: [
            {
                name: "GitHub",
                url: "https://github.com/BadAimWeeb/bird-lg-extended"
            },
            {
                name: "Live dn42 deployment",
                url: "https://dn42-lg.badaimweeb.me"
            }
        ]
    },
    {
        image: "",
        name: "C3CBot",
        type: "Software",
        tech: [
            "JavaScript"
        ],
        description: "a self-hosted Facebook Messenger and Discord chatbot. legacy project, no longer maintained (new version coming soon?).",
        buttons: [
            {
                name: "GitHub",
                url: "https://github.com/c3cbot/legacy-c3cbot"
            }
        ]
    },
    {
        image: EMC2,
        name: "e=mc² VN",
        type: "Minecraft server",
        tech: [
            "Java"
        ],
        description: '"generic" minecraft server. (vietnamese only atm)',
        buttons: [
            {
                name: "Discord",
                url: "https://discord.gg/NZzBEceEeH"
            }
        ]
    },
    {
        image: GSVN,
        name: "GameStoreVN",
        type: "Web",
        tech: [
            "React",
            "TypeScript"
        ],
        description: "online store for game stuff.",
        buttons: [
            {
                name: "Website",
                url: "https://gamestorevn.com"
            }
        ]
    }
]

const skills: {
    name: string,
    icon: string,
    description: string,
    color: AccentColors,
    textColor: string
}[] = [
        {
            name: "TypeScript",
            icon: tsIcon,
            description: "javascript with types. pure javascript suck :)",
            color: "blue",
            textColor: "#007acc"
        },
        {
            name: "JavaScript",
            icon: jsIcon,
            description: "in case typescript is not here",
            color: "yellow",
            textColor: "#f7df1e"
        },
        {
            name: "Node.js",
            icon: nodeJSIcon,
            description: "javascript on server? yes please",
            color: "green",
            textColor: "#3c873a"
        },
        {
            name: "Rust",
            icon: rustIcon,
            description: "we going fast boi",
            color: "bronze",
            textColor: "#a18072"
        },
        {
            name: "Java",
            icon: javaIcon,
            description: "cooking mc with this one",
            color: "red",
            textColor: "#e5484d"
        },
        {
            name: "C#",
            icon: csIcon,
            description: "java but microsoft",
            color: "purple",
            textColor: "#a179dc"
        },
        {
            name: "C++",
            icon: cppIcon,
            description: "segmentation fault",
            color: "blue",
            textColor: "#649ad2"
        },
        {
            name: "React",
            icon: reactIcon,
            description: "i'm not going back to pure js",
            color: "indigo",
            textColor: "#61dafb"
        }
    ]

export default function PageHome() {
    return (
        <div className={cls.HomePage}>
            <Element name="home" className={cls.Main}>
                <ParallaxBanner
                    layers={[{ image: Huohuo, speed: -30, className: cls.BannerInner }]}
                    className={cls.Banner}
                />
                <div className={cls.Info}>
                    <Heading className={cls.Hello} size="6">
                        BadAimWeebです
                    </Heading>
                    <Text size="2" color="gray">
                        welcome to my terrible landing page (づ｡◕‿‿◕｡)づ
                    </Text>
                </div>
            </Element>
            <Element name="about-me" className={cls.Section}>
                <div className={cls.Heading}>
                    <IconButton className={cls.Icons} size="4" variant="surface">
                        <PiInfoDuotone size={25} />
                    </IconButton>
                    <div className={cls.Inf}>
                        <Heading style={{ "--text-color": "#e2d1d4" } as React.CSSProperties} className={"PrettyTitle"} size="4">
                            about me
                        </Heading>
                        <Text size="1" color="gray">
                            is it really that interesting?
                        </Text>
                    </div>
                </div>
                <div className={cls.BodyAbout}>
                    {/* <img src={banner} alt="banner" className={cls.BannerAbout} /> */}

                    <div className={cls.Content}>
                        <Text size="2" color="gray">
                            i'm a 20-year-old guy who likes to do programming stuff, gaming, and anime. originally from vietnam, but currently living in usa.<br />
                            i'm operating an AS in <Link href="https://dn42.dev" target="_blank">dn42</Link> under AS4242423797 (interested in peering? <LinkScroll to="contact-me"><Link href="#contact-me">contact me!</Link></LinkScroll>).<br /><br />
                            (what should i put here...?)
                        </Text>
                    </div>
                </div>
            </Element>
            <Element name="my-skills" className={cls.Section}>
                <div className={cls.Heading}>
                    <IconButton className={cls.Icons} size="4" variant="surface">
                        <PiMagicWandDuotone size={25} />
                    </IconButton>
                    <div className={cls.Inf}>
                        <Heading style={{ "--text-color": "#e2d1d4" } as React.CSSProperties} className={"PrettyTitle"} size="4">
                            my programming skills
                        </Heading>
                        <Text size="1" color="gray">
                            what skills? do i have any skill? lmao
                        </Text>
                    </div>
                </div>
                <Grid columns={{
                    initial: "1",
                    md: "3",
                    sm: "2",
                    xs: "1"
                }} gap={{
                    initial: "1",
                    md: "3",
                    sm: "2",
                    xs: "1"
                }} width="auto">
                    {skills.map((skill, index) => (
                        <Card variant="surface" key={index} className={cls.TechCard}>
                            <IconButton size="4" color={skill.color} variant="soft">
                                <img src={skill.icon} alt={skill.name} className={cls.TechLogo} />
                            </IconButton>
                            <div>
                                <Heading style={{ "--text-color": skill.textColor } as React.CSSProperties} className={"PrettyTitle"} size="4">
                                    {skill.name}
                                </Heading>
                                <Text style={{ marginTop: '0.2rem' }} as="div" color="gray" size="1">
                                    {skill.description}
                                </Text>
                            </div>
                        </Card>
                    ))}
                </Grid>
            </Element>
            <Element name="my-projects" className={cls.Section}>
                <div className={cls.Heading}>
                    <IconButton className={cls.Icons} size="4" variant="surface">
                        <PiCodeDuotone size={25} />
                    </IconButton>
                    <div className={cls.Inf}>
                        <Heading style={{ "--text-color": "#e2d1d4" } as React.CSSProperties} className={"PrettyTitle"} size="4">
                            my projects and services
                        </Heading>
                        <Text size="1" color="gray">
                            *cue procastination*
                        </Text>
                    </div>
                </div>
                <div className={cls.BodyProjects}>
                    {List.map((project, index) => (
                        <Card variant="surface" key={index} className={cls.Projects}>
                            <img src={project.image} alt={project.name} className={cls.ProjectImage} />

                            <div className={cls.ProjectInfoContainer}>
                                <div className={cls.ProjectInfo}>
                                    <Heading size="3" className={"PrettyTitle"}>
                                        {project.name} <Badge size="1" style={{ marginLeft: 4 }}>{project.type}</Badge>
                                    </Heading>
                                    <Text size="1" color="gray" className={cls.ProjectDescription}>
                                        {project.description}
                                    </Text>
                                    <div className={cls.ProjectTech}>
                                        {project.tech.map((tech, index) => (
                                            <Badge variant="outline" key={index} size="1" className={cls.ProjectTechItem}>
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className={cls.space}></div>
                                <div className={cls.Action}>
                                    {project.buttons.map((button, index) => (
                                        <a href={button.url} target="_blank" rel="noreferrer">
                                            <Button size="1" key={index} variant="solid" className={cls.ProjectButton}>
                                                {button.name}
                                            </Button>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Element>
            <Element name="contact-me" className={cls.Section}>
                <div className={cls.Heading}>
                    <IconButton className={cls.Icons} size="4" variant="surface">
                        <PiPhoneCallDuotone size={25} />
                    </IconButton>
                    <div className={cls.Inf}>
                        <Heading style={{ "--text-color": "#e2d1d4" } as React.CSSProperties} className={"PrettyTitle"} size="4">
                            contact
                        </Heading>
                        <Text size="1" color="gray">
                            um... hi?
                        </Text>
                    </div>
                </div>
                <div className={cls.BodyContact}>
                    <Text align="center" size="3" color="gray">
                        i have multiple ways to be contacted (from most to least recommended):<br />
                    </Text>

                    <div className={cls.List}>
                        {ListSocial.map((social, index) => (
                            <Tooltip content={social.name} key={index}>
                                <a href={social.url} target="_blank" title={social.name} rel="noreferrer">
                                    <IconButton size="4" variant="surface" className={cls.Social}>
                                        {social.icon}
                                    </IconButton>
                                </a>
                            </Tooltip>
                        ))}
                    </div>

                    <Text align="center" size="3" color="gray" style={{ marginBottom: '1rem' }}>
                        dn42 people! if you are going to email me, please use dn42-specific email:&nbsp;
                        <Link color="gray" href="mailto:dn42@badaimweeb.me">dn42@badaimweeb.me</Link>
                    </Text>
                </div>
            </Element>
        </div>
    )
}
