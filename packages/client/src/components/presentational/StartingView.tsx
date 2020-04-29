import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default (props: {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <div className="Landing">
      <h1>My Pokedex</h1>
      <Button type="primary" onClick={props.onClick}>
        <SearchOutlined />
        &nbsp; EXPLORE
      </Button>
    </div>
  );
};
