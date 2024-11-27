import { type FC } from 'react';
import { Button, Flex, Result } from 'antd';

import './ErrorNotFound.scss';

const ErrorNotFound: FC = () => (
  <Flex align="center" className="error-not-found" justify="center" vertical>
    <Result
      extra={[
        <Button type="link">Вернуться на главную</Button>,
      ]}
      status="error"
      subTitle="Страницы, на которую вы пытаетесь перейти не существует."
      title="Ошибка 404"
    />
  </Flex>
);

export default ErrorNotFound;
