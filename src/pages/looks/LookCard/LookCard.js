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

  const handleDelete = () => {
    console.log(props.look._id);
  }

  return (
    <Card
      hoverable
      bordered
      style={{ width: 240, marginBottom: 30, height: 385 }}
      cover={
        <Image
          alt={props.look.title}
          src={props.look.mediaUrl}
          placeholder={<Image src={props.look.url} width={240} height={320} placeholder={spinnerFormated} />}
          width={240}
          height={320}
        />}
    >
      <Meta title={
        <div>
          {props.look.title}
          <span onClick={handleDelete}>delete</span>
        </div>
      } />
    </Card>
  );
};

export default LookCard;
