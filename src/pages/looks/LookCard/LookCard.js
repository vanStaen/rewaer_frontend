import React from "react";
import { Image, Card } from "antd";
import { Spin } from 'antd';


import "./LookCard.css";

const { Meta } = Card;

const LookCard = (props) => {

  const picThumb =
    "https://rewaer-backend.herokuapp.com/old/" + props.num + "_thumb.jpg";
  const pic =
    "https://rewaer-backend.herokuapp.com/old/" + props.num + ".jpg";
  const title = props.title;



  const spinnerFormated = (
    <div className="card__spinner">
        <Spin size="middle"/>
      </div>
  )

  return (
    <Card
      hoverable
      bordered
      style={{ width: 240, marginBottom: 30, height: 385 }}
      cover={    
      <Image
        alt={title}
        src={pic}
        placeholder={<Image src={picThumb} width={240} height={320} placeholder={spinnerFormated}/>}
        width={240}
        height={320}
      />}
    >
      <Meta title={title} />
    </Card>
  );
};

export default LookCard;
