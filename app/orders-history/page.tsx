'use client'
import React, { useState } from 'react';
import { Col, Pagination, Row, Switch, Table } from 'antd';
import type { PaginationProps, TableColumnsType } from 'antd';

const columns: TableColumnsType = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' }
];

const data: any = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const OrdersHistoryPage = () => {

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
  };

  return (
    <Row gutter={16}>
      <Col span={24} className='p-3'>
        <div className='p-6 bg-white'>
          <Table
            bordered
            columns={columns}
            dataSource={data}
            expandable={{
              expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.address}</p>,
            }}
            pagination={false}
          />

          <div className='py-3'></div>

          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={3}
            total={100}
            className='flex justify-center items-center'
          />
        </div>
      </Col>
    </Row>
  );
};

export default OrdersHistoryPage;