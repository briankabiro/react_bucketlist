import * as React from 'react'
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import _ from 'lodash';

export default (props) => (
  <Pagination>
    {_.times(props.pages, i =>
    <PaginationItem key={i+1}>
        <PaginationLink onClick={() => props.onClick(i+1)}>
          {i+1}
        </PaginationLink>
      </PaginationItem>
    )}
  </Pagination>
)
