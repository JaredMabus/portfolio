declare global {
  // Type definition for custom theme
  interface CustomStyles {
    main1?: string;
    main2?: string;
    main3?: string;
    secondary?: string;
    background?: string;
    fontColor?: string;
    menu?: string;
    content?: string;
  }
  // Used to extend the DefaultTheme type with CustomStyles
  type CustomGlobal = DefaultTheme & CustomStyles;

  // Sidebar props extends the IntrinsicAttributes
  interface SideBarProps {
    sidebar: boolean;
    test: string;
  }

  type SideBarComponent = IntrinsicAttributes & SideBarProps;
}

export {};
