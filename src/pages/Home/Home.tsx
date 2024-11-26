import { UIEvent, useEffect, useState } from 'react';
import {
  Button, Flex, Form, FormProps, Input, Table, TableProps,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLazyGetIssuesQuery } from '../../redux/issuesApi';
import { updateFormFields } from '../../redux/formSlice';
import { RootState } from '../../redux/store';
import Toolbar from '../../components/Toolbar/Toolbar';

import './Home.scss'

type FieldType = {
  user: string;
  repo: string;
};

interface RecordType {
  number: number;
  title: string;
}

function Home() {
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const [issues, setIssues] = useState([] as RecordType[]);

  const columns: TableProps<RecordType>['columns'] = [
    {
      title: 'Название',
      dataIndex: 'title',
    },
    {
      title: 'Номер',
      dataIndex: 'number',
    },
  ];

  const [trigger, result] = useLazyGetIssuesQuery();
  const {
    isLoading, isFetching, isError, data,
  } = result;

  const dispatch = useDispatch();
  const { user, repo } = useSelector((state: RootState) => state.formFields);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    dispatch(updateFormFields(values));
    trigger({ ...values, limit: 30, offset: totalCount });
  };

  useEffect(() => {
    if (user && repo) {
      trigger({ user, repo, limit: 30, offset: totalCount });
    }
  }, [user, repo])

  useEffect(() => {
    if (data?.length) {
      setIssues((prevIssues) => [...prevIssues, ...data]);
    }
  }, [data]);

  const handleScroll = async (e: UIEvent) => {
    const { scrollTop, clientHeight, scrollHeight } = (e.target as HTMLDivElement);
    if (scrollTop + clientHeight >= scrollHeight) {
      if (!isLoading && !isFetching && !isError && data.length > 0) {
        setTotalCount(totalCount + 30);
        await trigger({
          user,
          repo,
          offset: totalCount + 30,
          limit: 30,
        });
      }
    }
  };

  return (
    <Flex vertical className='home'>
      <Toolbar title='Главная - Список issues'>
        <Form className='find-form' onFinish={onFinish} size="large" layout='inline' initialValues={{ user, repo }}>
          <Form.Item name="user">
            <Input placeholder='Пользователь' />
          </Form.Item>
          <Form.Item name="repo">
            <Input placeholder='Репозиторий' />
          </Form.Item>
          <Button className='find-button' type="primary" htmlType="submit">
            Получить issues
          </Button>
        </Form>
      </Toolbar>
      <Table
        onRow={(record) => ({
          onClick: () => navigate(`/issue/${user}/${repo}/${record.number}`),
        })}
        bordered={true}
        columns={columns}
        dataSource={isError ? [] : issues}
        pagination={false}
        loading={isLoading || isFetching}
        onScroll={handleScroll}
        scroll={{ x: '100%', y: '720px' }}
      />
    </Flex>
  );
}

export default Home;