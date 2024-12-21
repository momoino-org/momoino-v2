import { useTheme, useThemeProps } from '@mui/material';
import { Icon, IconProps } from '@tabler/icons-react';
import { ReactElement } from 'react';

export interface TablerIconProps extends Omit<IconProps, 'size'> {
  /**
   * The icon component to be rendered.
   */
  icon: Icon;

  /**
   * The size of the icon, can be 'small', 'medium', or 'large'.
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Renders a TablerIcon component with the specified icon and props.
 *
 * @returns {ReactElement} The rendered TablerIcon component.
 */
export function TablerIcon({
  icon: Icon,
  ...rest
}: TablerIconProps): ReactElement {
  const theme = useTheme();
  const { size = 'medium', ...normalizedProps } = useThemeProps({
    props: rest,
    name: 'TablerIcon',
  });

  return <Icon size={theme.typography.iconSizes[size]} {...normalizedProps} />;
}
