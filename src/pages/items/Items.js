import React, { Fragment } from "react";
import axios from "axios";
import AuthContext from "../../context/auth-context";

export default class ItemsPage extends React.Component {
  state = {
    file: null,
    fileName: null,
    uploadedFileName: null,
    uploadedFileUrl: null,
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.context.getNewToken();
  }

  fileSelectHandler = event => {
    this.setState({ file: event.target.files[0] });
    this.setState({ fileName: event.target.files[0].name });
  }

  submitHandler = async event => {
    event.preventDefault();
    const file = event.target.fileInput.files[0];
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
      // TODO: Create Look/item Entry
      const mediaUrl = res.data.imageUrl
      const title = res.data.imageOriginalName // or date?
      const requestBody = {
        query: `
            mutation {
                createLook(
                  lookInput: { mediaUrl: "${mediaUrl}", title: "${title}" }
                ) {
                  _id
                }
              }
              `
      };
      console.log('requestBody', requestBody)
      // post new Look
      postNewLook(this.context.token, requestBody).then((resData) => {
        // Success!
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
          <input type="file" id="file" name="fileInput" onChange={this.fileSelectHandler} />
          <input type="submit" />
        </form>
      </Fragment >
    )
  }
}
