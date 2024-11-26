import React from "react";
import { Button, Flex, Result } from "antd";

import './ErrorNotFound.scss'

const ErrorNotFound: React.FC = () => (
  <Flex className="error-not-found" vertical align="center" justify="center">
    <Result
      status="error"
      title="Ошибка 404"
      subTitle="Страницы, на которую вы пытаетесь перейти не существует."
      extra={[
        <Button type='link'>Вернуться на главную</Button>,
      ]}
    />
  </Flex>
);

export default ErrorNotFound;