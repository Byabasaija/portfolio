import type { About } from "@/types/about";
import type { Resume } from "@/types/resume";
import type { NavigationLink } from "@/types/nav-bar";
import { OpenGraph } from "./open-graph";
import type { GiscusProps } from "@giscus/react";
import type { IconType as ReactIconType } from "react-icons";
import type { Icon as OcticonsType } from "@primer/octicons-react";
import type { Person } from "@/types/json-ld";
import type { Metadata } from "next";

export type VCardIconType = ReactIconType | OcticonsType;

export type SocialLink = {
  url: string;
  icon: VCardIconType;
  name: string;
};

export type Contact = {
  icon: VCardIconType;
  title: string;
  content?: string;
  link?: string;
};

export type Config = {
  avatar: string;
  title: string;
  description: string;
  author: string;
  keywords: string[];
  status: string;
  siteURL: string;
  openGraph: OpenGraph;
  navigationLinks: NavigationLink[];
  contacts: Contact[];
  socialLinks: SocialLink[];
  homeMetaData: Metadata;
  about: About;
  resume: Resume;
  jsonLdPerson: Person;
  giscusConfig: GiscusProps;
  googleAnalyticId: string;
  googleTagManagerId: string;
};
