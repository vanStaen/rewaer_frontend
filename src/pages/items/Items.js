import React, { Fragment } from "react";
import axios from "axios";
import moment from 'moment';

import { SkinOutlined } from '@ant-design/icons';
import AuthContext from "../../context/auth-context";

import "./input.css";

export default class ItemsPage extends React.Component {
  state = {
    uploadedFileName: null,
    uploadedFileUrl: null,
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.context.getNewToken();
  }

  fileSelectHandler = async (event) => {
    this.submitHandler(event.target.files[0]);
  }

  submitHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    async function postNewLook(token, requestBody) {

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
        throw new Error("Unauthenticated!");
      }
      const newLook = await response.data;
      return newLook;
    }

    try {
      const res = await axios.post(process.env.REACT_APP_API_URL_UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.context.token,
        }
      })
      this.state.uploadedFileName = res.data.imageOriginalName
      this.state.uploadedFileUrl = res.data.imageUrl
      // Create Look entry
      const mediaUrl = res.data.imageUrl
      const mediaUrlThumb = res.data.thumbUrl
      const title = moment().format('DD.MM.YYYY');
      const requestBody = {
        query: `
            mutation {
                createLook(
                  lookInput: { mediaUrl: "${mediaUrl}", 
                               mediaUrlThumb: "${mediaUrlThumb}",
                               title: "${title}" }
                ) {
                  _id
                }
              }
              `
      };
      console.log("requestBody", requestBody);
      // post new Look
      postNewLook(this.context.token, requestBody).then((resData) => {
        console.log('Success!');
      }
      ).catch(error => {
        console.log(error.message);
      });

    } catch (err) {
      console.log(err)
    }
  }

  render() {

    return (
      <Fragment>
        <form onSubmit={this.submitHandler}>
          <input
            type="file"
            class="inputfile"
            name="inputfile"
            id="file"
            onChange={this.fileSelectHandler}
          />
          <label for="file">
            <p className="form-upload-drag-icon">
              <SkinOutlined />
            </p>
            <p className="form-upload-text">Add Item</p>
            <p className="form-upload-hint">
              Start with a photo <br />
              Click, or drag here a file
            </p>
          </label>
        </form>
      </Fragment >
    )
  }
}
