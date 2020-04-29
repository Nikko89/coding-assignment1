import React from "react";
import { Card } from "antd";

export default (props: {
  node: {
    id: string;
    types: string[];
    name: string;
    classification: string;
  };
  image: boolean;
  key: number;
}) => {
  const cleanId = parseInt(props.node.id, 10);
  return (
    <Card
      title={`#${cleanId} ${props.node.name}`}
      style={{ backgroundColor: `rgba(255,255,255, 0.9)` }}>
      {props.image ? (
        <div className="Poke-image">
          <img
            alt={`pokemon image id ${cleanId}`}
            src={`https://pokeres.bastionbot.org/images/pokemon/${cleanId}.png`}
          />
        </div>
      ) : null}

      <div>{props.node.classification}</div>
      <ul style={{ marginTop: 5 }}>
        {props.node.types.map((el) => {
          return (
            <li style={{ textAlign: "left" }} key={el}>
              {el}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
