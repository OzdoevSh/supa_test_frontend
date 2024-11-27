import {
  type FC, type UIEvent, useEffect, useState,
} from 'react';
import {
  Button, Flex, Form, type FormProps, Input, Table, type TableProps,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLazyGetIssuesQuery } from '../../redux/issuesApi';
import { updateFormFields } from '../../redux/formSlice';
import { type RootState } from '../../redux/store';
import Toolbar from '../../components/Toolbar/Toolbar';

import './Home.scss';

interface FieldType {
  user: string
  repo: string
}

interface RecordType {
  number: number
  title: string
}

const Home: FC = () => {
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
    if (Boolean(user) && Boolean(repo)) {
      trigger({
        user, repo, limit: 30, offset: totalCount,
      });
    }
  }, [user, repo, trigger, totalCount]);

  useEffect(() => {
    if (Array.isArray(data) && data.length !== 0) {
      setIssues((prevIssues) => [...prevIssues, ...data]);
    }
  }, [data]);

  const handleScroll = async (e: UIEvent): Promise<void> => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, clientHeight, scrollHeight } = target;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
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
    <Flex className="home" vertical>
      <Toolbar title="Главная - Список issues">
        <Form className="find-form" initialValues={{ user, repo }} layout="inline" onFinish={onFinish} size="large">
          <Form.Item name="user">
            <Input placeholder="Пользователь" />
          </Form.Item>
          <Form.Item name="repo">
            <Input placeholder="Репозиторий" />
          </Form.Item>
          <Button className="find-button" htmlType="submit" type="primary">
            Получить issues
          </Button>
        </Form>
      </Toolbar>
      <Table
        bordered
        columns={columns}
        dataSource={isError ? [] : issues}
        loading={isLoading || isFetching}
        onRow={(record) => ({
          onClick: () => { navigate(`/issue/${user}/${repo}/${record.number}`); },
        })}
        onScroll={handleScroll}
        pagination={false}
        rowKey="number"
        scroll={{ x: '100%', y: '720px' }}
      />
    </Flex>
  );
};

export default Home;
