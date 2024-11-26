import { Descriptions, DescriptionsProps, Flex, Result, Spin, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetOneIssueQuery } from '../../redux/issuesApi';
import Toolbar from '../../components/Toolbar/Toolbar';

import './Issue.scss'

function Issue() {
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
      children: <Typography.Link target='_blank' href={data?.html_url}>Открыть</Typography.Link>,
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
      children: <Typography.Text>{data?.created_at}</Typography.Text>,
    },
    {
      key: 'updated_at',
      label: 'Дата обновления',
      children: <Typography.Text>{data?.updated_at}</Typography.Text>,
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
    <Flex vertical className='issue'>
      <Toolbar title='Информация об Issue' />
      <Flex className='general'>
        {(isLoading || isFetching) && <Spin />}
        {isError && <Result status="error" title="Такого Issue не существует" />}
        {data && (
          <Descriptions
            title="Общая информация"
            bordered
            items={issueInfoItems}
            column={1}
          />
        )}
      </Flex>
    </Flex>
  );
}

export default Issue;
