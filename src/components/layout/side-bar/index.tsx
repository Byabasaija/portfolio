"use client";

import { useState, useRef } from "react";
import SideBarInfo from "@/components/layout/side-bar/sidebar-info";
import ContactsList from "./contact-list";
import SocialList from "./social-list";
import Footer from "./footer";
import config from "@/config";

import type { Contact, SocialLink } from "@/types/config";

const { socialLinks, contacts } = config;

interface SideBarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string;
  contacts?: Contact[];
  socialLinks?: SocialLink[];
}

function SideBar({
  avatar,
  firstName,
  lastName,
  middleName,
  preferredName,
  status,
  contacts: propContacts = contacts,
  socialLinks: propSocialLinks = socialLinks,
}: SideBarProps) {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsActive((prevState) => !prevState);
  };

  const sideBarState = `sidebar ${isActive ? "active" : ""}`;

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <SideBarInfo
        onToggle={handleSidebarToggle}
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        preferredName={preferredName}
        status={status}
      />

      <div className="sidebar-info-more">
        <div className="separator"></div>
        <ContactsList contacts={propContacts} />
        <div className="separator-no-line"></div>
        <SocialList socialLinks={propSocialLinks} />
        <div className="separator-footer"></div>
        <Footer />
      </div>
    </aside>
  );
}

export default SideBar;
