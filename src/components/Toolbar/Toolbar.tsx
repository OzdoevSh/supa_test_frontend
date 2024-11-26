import { FC, ReactNode } from "react";
import { Flex, Typography } from 'antd';

import './Toolbar.scss';

interface ToolbarProps {
  title: string,
  children?: ReactNode,
}

const Toolbar: FC<ToolbarProps> = ({ title, children }) => {
  return (
    <Flex className="toolbar" justify='space-between' align="center" wrap>
      <Typography.Text className='title'>{title}</Typography.Text>
      {children}
    </Flex>
  );
};

export default Toolbar;