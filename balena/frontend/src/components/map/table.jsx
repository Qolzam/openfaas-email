import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Latitude',
    dataIndex: 'lt',
    key: 'lt',
  },
  {
    title: 'Longitude',
    dataIndex: 'lg',
    key: 'lg',
  },
  {
    title: 'Speed',
    dataIndex: 's',
    key: 's',
  },
  {
    title: 'Status',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => {
      let color = 'green';
      return (
        <span>
          {(tags && tags.length > 0) ? tags.map((tag) => {
            if (tag === 'Stop') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          }) : (
            <Tag color={color} key="taveling">
              {'Traveling'.toUpperCase()}
            </Tag>
          )}
        </span>
      );
    },
  },

];


function TableComponent(props) {
  const { data } = props;
  return (
    <Table
      columns={columns}
      pagination={{ pageSize: 5 }}
      title={() => <h2>Telar</h2>}
      footer={() => <h2>Drones Dashboard</h2>}
      dataSource={data}
    />
  );
}

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    lt: PropTypes.number, lg: PropTypes.number, id: PropTypes.string, s: PropTypes.number,
  })).isRequired,
};

export default TableComponent;
