# PythonBot

Rewaer Front End

## To-dos:

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
