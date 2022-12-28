import { Avatar, Button, List, Skeleton } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ListItemMeta = styled(List.Item.Meta)`
  .ant-list-item-meta-title {
    margin-top: 5px;
  }
`;

const FollowList = ({ header, data }) => {
  return (
    <List
      header={header}
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      loadMore={
        <div>
          <Button>더보기</Button>
        </div>
      }
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Skeleton
            avatar
            title={false}
            loading={item.loading}
            // active
          >
            <ListItemMeta
              avatar={<Avatar>{item.nickname}</Avatar>}
              title={
                <a href="https://ant.design">
                  {item.nickname}
                </a>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FollowList;
