import { type FC, type ReactNode } from 'react';
import { Flex, Typography } from 'antd';

import './Toolbar.scss';

interface ToolbarProps {
  title: string
  children?: ReactNode
}

const Toolbar: FC<ToolbarProps> = ({ title, children }) => (
  <Flex align="center" className="toolbar" justify="space-between" wrap>
    <Typography.Text className="title">{title}</Typography.Text>
    {children}
  </Flex>
);

export default Toolbar;
