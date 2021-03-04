# Rewaer, FrontEnd

## To-dos:

- [ ] Implement MobX instead of using context
  - [x] Create an Authorisation Store to hanble token and login
  - [x] Create a store to handle profil data
  - [ ] Route Store saved in context:
    - [ ] Save all sub-Stores in a main store
    - [ ] Save the main Store into the context
- [ ] On RefreshToken not found in db > logout
- [ ] Handle new account created
  - [x] Show success message in App
  - [x] Handle errors from backend
  - [ ] Send Email to new user
    - [ ] User should confirm email?
- [ ] Recover password feature
- [ ] Notification if auth server is down
- [ ] Use custom image component for images
- [ ] Create own Card component
- [ ] infinite scrolling + lazy loading
- [ ] On nofile select, do not create item/look

## Completed ✓

- [x] Login feature
- [x] Dummy graphql query to wake up heroku backend
- [x] Handle error on connection failure with backend
- [x] Persist token in localStorage
- [x] Use new Auth server (BackEnd)
- [x] Implement refresh Token
  - [x] Stop persisting token in local var
  - [x] Start persisting refreshtoken in local var
  - [x] Kill refresh token on logout
  - [x] Handle when token not valid anymore
- [x] Check and handle validity of refresh token
- [x] Handle errors from backend (and display those)
  - [x] Show login error: email not known
  - [x] Show login error: wrong password
  - [x] Show logout error
  - [x] Show successful login
  - [x] Show successful logout
- [x] Looks: Show loading ot user
  - [x] Spinner when fetching looks from API
  - [x] Spinner when loading images of card component
  - [x] Thumbnail images during loading
- [x] Remember me feature
- [x] getNewToken() as context function
- [x] Add Delete look/item feature
- [x] Use Axios interceptors if token not valid
- - [x] Upload Images
  - [x] Front end to Rest API
  - [x] Handling request in Backend
  - [x] Backend to AWS S3
  - [x] Create Thumbnail on upload
- [X] On loading error, show error and redirect
- [x] First refactoring round:
  - [x] Rewrite fetch to use axios if auth relevant
  - [x] as many stateless component as possible
  - [x] check state usage in already created component
  - [x] Check class vs function component
  - [x] Take API-fetch-code, out from component
