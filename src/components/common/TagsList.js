import React from 'react';
import { Tag, Popover, Row, Col } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import ColTagList from './ColTagList';

function TagsList(props) {
  const { size, tagArray } = props;

  if (tagArray.length <= size)
    return (
      <Row>
        {tagArray.map(tag => (
          <ColTagList tag={tag} />
        ))}
      </Row>
    );

  const shownTags = tagArray.slice(0, size - 1);
  const hiddenTags = tagArray.slice(size - 1, tagArray.length);

  return (
    <Row>
      {shownTags.map(tag => (
        <ColTagList tag={tag} />
      ))}
      <Col>
        <Popover
          title="Tags cont."
          content={
            <Row>
              {hiddenTags.map(tag => (
                <ColTagList tag={tag} />
              ))}
            </Row>
          }
        >
          <Tag>
            <EllipsisOutlined />
          </Tag>
        </Popover>
      </Col>
    </Row>
  );
}

export default TagsList;
