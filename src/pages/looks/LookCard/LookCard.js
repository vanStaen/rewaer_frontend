import React from "react";
import { Image, Card } from "antd";
import { Spin } from 'antd';


import "./LookCard.css";

const { Meta } = Card;

const LookCard = (props) => {

  const spinnerFormated = (
    <div className="card__spinner">
      <Spin size="middle" />
    </div>
  )

  return (
    <Card
      hoverable
      bordered
      style={{ width: 240, marginBottom: 30, height: 385 }}
      cover={
        <Image
          alt={props.title}
          src={props.url}
          placeholder={<Image src={props.url} width={240} height={320} placeholder={spinnerFormated} />}
          width={240}
          height={320}
        />}
    >
      <Meta title={props.title} />
    </Card>
  );
};

export default LookCard;
