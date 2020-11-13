# PythonBot

Rewaer Front End

## To-dos:


- [ ] Upload Images
  - [ ] Front end to Rest API : https://www.youtube.com/watch?v=b6Oe2puTdMQ
  - [ ] Backend to database (s3)?: https://www.youtube.com/watch?v=srPXMt1Q0nY
        alt: https://www.youtube.com/watch?v=XeiOnkEI7XI
        alt: https://www.youtube.com/watch?v=KoWTJ5XiYm4
        alt: (s3) https://www.youtube.com/watch?v=cDj4LPTLR3o
- [ ] add Delete look feature
- [ ] Loader when loading card component
- [ ] Find a better solution to check/refreshToken
- [ ] First refactoring round:
  - [ ] in as many stateless component as possible
  - [ ] check state usage in already created component
  - [ ] Check class vs function component
- [ ] Handle new account created
  - [ ] Show success message in App
  - [ ] Send Email to new user
  - [ ] handle errors from backend
- [ ] Recover password feature
- [ ] Remember me feature

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
