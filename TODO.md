# PythonBot

Rewaer Front End

## To-dos:

- [ ] Loader when loading
- [ ] Upload Images
  - [ ] Front end to Rest API : https://www.youtube.com/watch?v=b6Oe2puTdMQ
  - [ ] Backend to database (s3)?: https://www.youtube.com/watch?v=srPXMt1Q0nY
        alt: https://www.youtube.com/watch?v=XeiOnkEI7XI
        alt: https://www.youtube.com/watch?v=KoWTJ5XiYm4
        alt: (s3) https://www.youtube.com/watch?v=cDj4LPTLR3o
- [ ] Check validity of refresh token
  - [ ] check if refresh token is valid
  - [ ] if not call logout
  - [ ] refactor in a separate module
- [ ] First refactoring round:
  - [ ] in as many stateless component as possible
  - [ ] check state usage in already created component
  - [ ] Check class vs function component
- [ ] Implement refresh Token
  - [x] Stop persisting token in local var
  - [x] Start persisting refreshtoken in local var
  - [ ] Kill refresh token on logout
  - [ ] Handle when token not valid anymore
- [ ] Handle Log/signin Errors from backend (and display those)
- [ ] Handle new account created
  - [ ] Show success message in App
  - [ ] Send Email to new user
- [ ] Restore Pwd feature

## Completed ✓

- [x] Login feature
- [x] Dummy graphql query to wake up heroku backend
- [x] Handle error on connection failure with backend
- [x] Persist token in localStorage
- [x] Use new Auth server (BackEnd)
