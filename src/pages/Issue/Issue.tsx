import { type FC } from 'react';
import {
  Descriptions, type DescriptionsProps, Flex, Result, Spin, Typography,
} from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useGetOneIssueQuery } from '../../redux/issuesApi';
import Toolbar from '../../components/Toolbar/Toolbar';

import './Issue.scss';

const Issue: FC = () => {
  const { number, repo, user } = useParams();
  const {
    isLoading, isFetching, isError, data,
  } = useGetOneIssueQuery({
    number,
    repo,
    user,
  });

  const issueInfoItems: DescriptionsProps['items'] = [
    {
      key: 'id',
      label: 'ID',
      children: <Typography.Text>{data?.id}</Typography.Text>,
    },
    {
      key: 'number',
      label: 'Номер',
      children: <Typography.Text>{data?.number}</Typography.Text>,
    },
    {
      key: 'title',
      label: 'Название',
      children: <Typography.Text>{data?.title}</Typography.Text>,
    },
    {
      key: 'link',
      label: 'Ссылка',
      children: <Typography.Link href={data?.html_url} target="_blank">Открыть</Typography.Link>,
    },
    {
      key: 'user_id',
      label: 'ID автора',
      children: <Typography.Text>{data?.user.id}</Typography.Text>,
    },
    {
      key: 'user_login',
      label: 'Логин автора',
      children: <Typography.Text>{data?.user.login}</Typography.Text>,
    },
    {
      key: 'created_at',
      label: 'Дата создания',
      children: <Typography.Text>{moment(data?.created_at).format('DD.MM.YYYY HH:mm')}</Typography.Text>,
    },
    {
      key: 'updated_at',
      label: 'Дата обновления',
      children: <Typography.Text>{moment(data?.updated_at).format('DD.MM.YYYY HH:mm')}</Typography.Text>,
    },
    {
      key: 'total_reactions',
      label: 'Общее количество реакций',
      children: <Typography.Text>{data?.reactions.total_count}</Typography.Text>,
    },
    {
      key: 'positive_reactions',
      label: 'Количество положительных реакций',
      children: <Typography.Text>{data?.reactions['+1']}</Typography.Text>,
    },
    {
      key: 'negative_reactions',
      label: 'Количество отрицательных реакций',
      children: <Typography.Text>{data?.reactions['-1']}</Typography.Text>,
    },
  ];

  return (
    <Flex className="issue" vertical>
      <Toolbar title="Информация об Issue" />
      <Flex className="general">
        {(isLoading || isFetching) && <Spin />}
        {isError && <Result status="error" title="Такого Issue не существует" />}
        {(Boolean(data)) && (
          <Descriptions
            bordered
            column={1}
            items={issueInfoItems}
            title="Общая информация"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Issue;
