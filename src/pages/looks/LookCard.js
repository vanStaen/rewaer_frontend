import React from "react";
import { Image, Card } from "antd";

const { Meta } = Card;

const LookCard = (props) => {
  const picThumb = "https://rewaer-backend.herokuapp.com/uploads/43_thumb.jpg";
  const pic = "https://rewaer-backend.herokuapp.com/uploads/43.jpg";
  const title = "Cold days 2019";
  return (
    <Card
      hoverable
      bordered
      style={{ width: 240, marginBottom: 30 }}
      cover={
        <Image
          alt={title}
          src={pic}
          placeholder={<Image src={picThumb} width={240} />}
        />
      }
    >
      <Meta title={title} />
    </Card>
  );
};

export default LookCard;
