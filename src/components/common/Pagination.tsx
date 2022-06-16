import React from "react";
import { Pagination as APagination, PaginationProps } from "antd";

const Pagination = ({ ...rest }: PaginationProps) => {
  return (
    <APagination
      //   prevIcon={"Prev"}
      //   nextIcon={"Next"}
      size="small"
      total={200}
      showSizeChanger={false}
      {...rest}
    />
  );
};

export default Pagination;
