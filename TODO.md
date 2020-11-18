# PythonBot

Rewaer Front End

## To-dos:

- [ ] Upload Images
  - [x] Front end to Rest API
  - [x] Handling request in Backend
  - [ ] Backend to AWS S3 https://www.youtube.com/watch?v=cDj4LPTLR3o
- [ ] Add Delete look feature
- [ ] Find a better solution to check/refreshToken
- [ ] First refactoring round:
  - [x] Rewrite fetch to use axios if auth relevant
  - [ ] as many stateless component as possible
  - [ ] check state usage in already created component
  - [ ] Check class vs function component
- [ ] Handle new account created
  - [x] Show success message in App
  - [x] Handle errors from backend
  - [ ] Send Email to new user
    - [ ] User should confirm email?
- [ ] Recover password feature

## Completed ✓

- [x] Login feature
- [x] Dummy graphql query to wake up heroku backend
- [x] Handle error on connection failure with backend
- [x] Persist token in localStorage
- [x] Use new Auth server (BackEnd)
- [x] Implement refresh Token
  - [x] Stop persisting token in local var
  - [x] Start persisting refreshtoken in local var
  - [] Kill refresh token on logout
  - [x] Handle when token not valid anymore
- [x] Check and handle validity of refresh token
- [x] Handle errors from backend (and display those)
  - [x] Show login error: email not known
  - [x] Show login error: wrong password
  - [x] Show logout error
  - [x] Show successfull login
  - [x] Show successfull logout
- [x] Looks: Show loading ot user
  - [x] Spinner when fetching looks from API
  - [x] Spinner when loading images of card component
  - [x] Thumbnail images during loading of high res image
- [x] Remember me feature
