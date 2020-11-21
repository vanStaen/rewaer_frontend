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
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL_UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.context.token,
        }
      })
      this.state.uploadedFileName = res.data.imageOriginalName
      this.state.uploadedFileUrl = res.data.imageUrl
      // Debug: console.log("Success", this.state.uploadedFileUrl);
      // TODO: Create Look/item Entry
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
