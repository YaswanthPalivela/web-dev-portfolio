"use client";

import { FloatingNav } from "@/components/floatingNavbar";
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconMail,
  IconFileText,
} from "@tabler/icons-react";

export default function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className="h-4 w-4" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <IconBriefcase className="h-4 w-4" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <IconMail className="h-4 w-4" />,
    },
    {
      name: "Resume",
      link: "/doc/Yaswanth_Palivela.pdf",
      icon: <IconFileText className="h-4 w-4" />,
    },
  ];

  return <FloatingNav navItems={navItems} />;
}
