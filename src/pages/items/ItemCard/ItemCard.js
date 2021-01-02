import React from "react";
import { Image, Card } from "antd";
import { Spin } from 'antd';

import "./ItemCard.css";

const { Meta } = Card;

const ItemCard = (props) => {

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
          alt={props.item.title}
          src={props.item.mediaUrl}
          placeholder={<Image src={props.item.url} width={240} height={320} placeholder={spinnerFormated} />}
          width={240}
          height={320}
        />}
    >
      <Meta title={
        <div>
          {props.item.title}
        </div>
      } />
    </Card>
  );
};

export default ItemCard;
