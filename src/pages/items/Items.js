import React, { Fragment } from "react";

import AuthContext from "../../context/auth-context";
import ItemForm from "./ItemForm/ItemForm"

import "./input.css";

export default class ItemsPage extends React.Component {

  static contextType = AuthContext;

  componentDidMount() {
    this.context.getNewToken();
  }

  render() {

    return (
      <>
        <ItemForm token={this.context.token} />
      </>
    )
  }
}
