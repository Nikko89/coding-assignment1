import React from "react";
import {
  Form,
  Input,
  InputNumber,
  AutoComplete,
  Typography,
  Checkbox,
  Tooltip,
} from "antd";

const pokemonTypes: string[] = [
  "fire",
  "water",
  "grass",
  "poison",
  "flying",
  "dragon",
  "psychic",
  "steel",
  "normal",
  "rock",
  "ice",
];

export default (props: {
  setType: Function;
  setName: Function;
  setLimit: Function;
  setQuantity: Function;
  setAddImages: Function;
  images: boolean;
  pageQuantity: number;
  limit: number;
  name: String;
  type: String;
}) => {
  return (
    <Form
      className="Options"
      layout="inline"
      onFieldsChange={(values) => {
        console.log(values);
      }}>
      <Form.Item
        label="Results per load"
        style={{ marginBottom: 0, marginRight: "20px" }}>
        <InputNumber
          defaultValue={props.limit}
          placeholder="Limit"
          min={1}
          onChange={(e) => {
            props.setLimit(e);
          }}></InputNumber>
      </Form.Item>
      <Form.Item
        label="Results per page"
        style={{ marginBottom: 0, marginRight: "20px" }}>
        <InputNumber
          defaultValue={props.pageQuantity}
          placeholder="Limit"
          min={1}
          onChange={(e) => {
            props.setQuantity(e);
          }}></InputNumber>
      </Form.Item>
      <Form.Item
        label={<Typography.Text disabled={!!props.type}>Name</Typography.Text>}
        style={{
          marginBottom: 0,
          marginRight: "20px",
        }}>
        <Input
          placeholder="Name"
          allowClear
          onChange={(e) => {
            props.setName(e.target.value);
            e.preventDefault();
          }}></Input>
      </Form.Item>
      <Form.Item
        label={<Typography.Text>Type</Typography.Text>}
        style={{ marginBottom: 0 }}>
        <AutoComplete
          dataSource={pokemonTypes}
          onChange={(e) => {
            props.setType(e);
          }}>
          <Input
            placeholder="Type"
            allowClear
            onChange={(e) => {
              props.setType(e.target.value);
              e.preventDefault();
            }}></Input>
        </AutoComplete>
      </Form.Item>
      <Form.Item label={<Typography.Text>Add images</Typography.Text>}>
        <Tooltip title="Warning: Linking to external resources" trigger="hover">
          <div>
            <Checkbox
              onChange={() => {
                props.setAddImages(!props.images);
              }}></Checkbox>
          </div>
        </Tooltip>
      </Form.Item>
    </Form>
  );
};
