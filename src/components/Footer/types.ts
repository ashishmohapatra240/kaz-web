export interface SocialLink {
    platform: string;
    url: string;
    icon: React.ReactNode;
}

export interface NavItem {
    label: string;
    href: string;
    isActive?: boolean;
}

export interface FooterSection {
    title: string;
    links: { label: string; href: string; }[];
}