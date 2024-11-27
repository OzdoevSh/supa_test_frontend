import { type FC, useEffect, useState } from 'react';
import { Flex, Table, type TableProps } from 'antd';
import moment from 'moment';
import { useGetLogsQuery } from '../../redux/issuesApi';
import Toolbar from '../../components/Toolbar/Toolbar';

interface RecordType {
  id: string
  userIp: string
  requestType: string
  createdAt: Date
  executionTime: number
}

const Stats: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const {
    refetch, isLoading, isFetching, isError, data,
  } = useGetLogsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const handlePageChange = (page: number, pageSize?: number): void => {
    setItemsPerPage(pageSize ?? itemsPerPage);
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, itemsPerPage, refetch]);

  const columns: TableProps<RecordType>['columns'] = [
    {
      title: 'IP пользователя',
      dataIndex: 'userIp',
    },
    {
      title: 'Название запроса',
      dataIndex: 'requestType',
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      render: ({ record }) => moment(record?.createdAt).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Время выполнения (мс)',
      dataIndex: 'executionTime',
    },
  ];

  return (
    <Flex vertical>
      <Toolbar title="Статистика - Список логов" />
      <Table
        bordered
        columns={columns}
        dataSource={isError ? [] : data?.logs}
        pagination={{
          position: ['bottomRight'],
          current: currentPage,
          onChange: handlePageChange,
          pageSize: itemsPerPage,
          total: data?.total ?? 0,
          showTotal: (total) => `Всего ${total} записей`,
        }}
        loading={isLoading || isFetching}
        scroll={{ x: '100%', y: '720px' }}
      />
    </Flex>
  );
};

export default Stats;
