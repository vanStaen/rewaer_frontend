import React, { useState } from 'react';

// Import Amplify and Storage
import Amplify, { Storage } from 'aws-amplify';
// withAuthenticator is a higher order component that wraps the application with a login page
import { withAuthenticator } from '@aws-amplify/ui-react';
// Import the project config files and configure them with Amplify
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const ItemsPage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const downloadUrl = async () => {
    // Creates download url that expires in 5 minutes/ 300 seconds
    const downloadUrl = await Storage.get('picture.jpg', { expires: 300 });
    window.location.href = downloadUrl
  }

  const handleChange = async (e) => {
    const file = e.target.files[0];
    try {
      setLoading(true);
      // Upload the file to s3 with private access level. 
      await Storage.put('picture.jpg', file, {
        level: 'private',
        contentType: 'image/jpg'
      });
      // Retrieve the uploaded file to display
      const url = await Storage.get('picture.jpg', { level: 'private' })
      setImageUrl(url);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <h1> Upload an Image </h1>
      {loading ? <h3>Uploading...</h3> : <input
        type="file" accept='image/jpg'
        onChange={(evt) => handleChange(evt)}
      />}
      <div>
        {imageUrl ? <img alt='alt' style={{ width: "30rem" }} src={imageUrl} /> : <span />}
      </div>
      <div>
        <h2>Download URL?</h2>
        <button onClick={() => downloadUrl()}>Click Here!</button>
      </div>
    </div>
  );
}

// withAuthenticator wraps your App with a Login component
export default withAuthenticator(ItemsPage);