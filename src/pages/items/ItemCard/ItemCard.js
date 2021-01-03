import React from "react";
import { Image, Card, notification, Spin } from "antd";
import axios from "axios";

import "./ItemCard.css";

const { Meta } = Card;

const ItemCard = (props) => {

  const handleDelete = () => {
    const deleteLook = async (token, requestBody) => {
      const response = await axios({
        url: process.env.REACT_APP_API_URL,
        method: "POST",
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if ((response.status !== 200) & (response.status !== 201)) {
        notification.error({ message: `Unauthenticated!`, placement: "bottomRight", });
        throw new Error("Unauthenticated!");
      }
      return "Success";
    }
    const requestBody = {
      query: `
          mutation {
              deleteItem(itemId: "${props.item._id}") {
                _id
              }
            }
            `
    };
    console.log("requestBody", requestBody);
    // delete Look
    deleteLook(props.token, requestBody)
      .then(() => {
        notification.success({ message: `Look deleted successfully.`, placement: "bottomRight", });
        // retrigger parent component rendering
        props.setIsOutOfDate(true);
        console.log('Success!');
      }
      ).catch(error => {
        notification.error({ message: `Error!`, placement: "bottomRight", });
        console.log(error.message);
      });
  }

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
          &nbsp;&nbsp;&nbsp;
          <span onClick={handleDelete}>delete</span>
        </div>
      } />
    </Card>
  );
};

export default ItemCard;