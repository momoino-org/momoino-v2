import type {} from '@mui/material/themeCssVarsAugmentation';
import type { TablerIconProps } from '../components/TablerIcon';
import { SideMenuProps } from '../components/SideMenu';

declare module '@mui/material/styles' {
  interface Typography {
    iconSizes: { small: string; medium: string; large: string };
  }

  interface TypographyVariants {
    iconSizes: {
      small: string;
      medium: string;
      large: string;
    };
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    iconSizes: {
      small: string;
      medium: string;
      large: string;
    };
  }

  // interface ComponentNameToClassKey {
  //   TablerIcon: 'root';
  // }

  interface ComponentsPropsList {
    TablerIcon: Partial<Omit<TablerIconProps, 'icon'>>;
    SideMenu: Partial<SideMenuProps>;
  }

  interface Components {
    TablerIcon?: {
      defaultProps?: ComponentsPropsList['TablerIcon'];
    };
    SideMenu?: {
      defaultProps?: ComponentsPropsList['SideMenu'];
    };
  }
}
