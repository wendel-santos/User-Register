const form = document.querySelector('form')
const inputUsername = document.querySelector('#username')
const inputPassword = document.querySelector('#password')
const inputRepeatPassword = document.querySelector('#repeat_password')
const button = document.querySelector('button')

const paragraphUsernameFeedback = document.createElement('p')
const paragraphPasswordFeedback = document.createElement('p')
const paragraphRepeatPasswordFeedback = document.createElement('p')
const paragraphSubmitFeedback = document.createElement('p')

paragraphRepeatPasswordFeedback.setAttribute('data-feedback', 'repeat-password-feedback')
paragraphSubmitFeedback.setAttribute('data-feedback', 'submit-feedback')

const invalidUsernameInfo = {
  paragraph: paragraphUsernameFeedback,
  text: 'The username must contain at least 6 characters, with only numbers, uppercase and/or lowercase letters',
  className: 'username-help-feedback',
  previousSibling: inputUsername
}
const validUsernameInfo = {
  paragraph: paragraphUsernameFeedback,
  text: 'Valid username =)',
  className: 'username-success-feedback',
  previousSibling: inputUsername
}

const invalidPassword = {
  paragraph: paragraphPasswordFeedback,
  text: 'The password must contain at least 10 characters, with only numbers, uppercase and/or lowercase letters',
  className: 'username-help-feedback',
  previousSibling: inputPassword
}
const validPassword = {
  paragraph: paragraphPasswordFeedback,
  text: 'Valid password ;)',
  className: 'username-success-feedback',
  previousSibling: inputPassword
}

const invalidRepeatedPassword = {
  paragraph: paragraphRepeatPasswordFeedback,
  text: 'Both passwords must be the same',
  className: 'username-help-feedback',
  previousSibling: inputRepeatPassword
}
const validRepeatedPassword = {
  paragraph: paragraphRepeatPasswordFeedback,
  text: 'Nice, both passwords match perfectly =D',
  className: 'username-success-feedback',
  previousSibling: inputRepeatPassword
}

const invalidSubmitInfo = {
  paragraph: paragraphSubmitFeedback, 
  text: 'Please, register a valid username and password', 
  className: 'submit-help-feedback', 
  previousSibling: button
}
const validSubmitInfo = {
  paragraph: paragraphSubmitFeedback, 
  text: 'Congrats, data sent xD', 
  className: 'submit-success-feedback', 
  previousSibling: button
}

const insertParagraphIntoDOM = paragraphInfo => {
  const { paragraph, text, className, previousSibling } = paragraphInfo
  paragraph.textContent = text
  paragraph.setAttribute('class', className)
  previousSibling.insertAdjacentElement('afterend', paragraph)
}

const removeSubmitParagraph = () => {
  const paragraphSubmitFeedbackExists = 
    document.querySelector('[data-feedback="submit-feedback"]')

  if (paragraphSubmitFeedbackExists) {
    paragraphSubmitFeedbackExists.remove()
  }
}

const removeRepeatPasswordParagraph = () => {
  const paragraphRepeatPasswordExists = 
    document.querySelector('[data-feedback="repeat-password-feedback"]')

  if (paragraphRepeatPasswordExists) {
    paragraphRepeatPasswordExists.remove()
  }
}

const testUsername = inputValue => /^[a-zA-Z0-9]{6,}$/.test(inputValue)
const testPassword = inputValue => /^[a-zA-Z0-9]{10,}$/.test(inputValue)

const showUsernameInfo = e => {
  const isUsernameValid = testUsername(e.target.value)

  removeSubmitParagraph()

  if (!isUsernameValid) {
    insertParagraphIntoDOM(invalidUsernameInfo)
    return 
  }

  insertParagraphIntoDOM(validUsernameInfo)
}

const showPasswordInfo = e => {
  const isPasswordValid = testPassword(e.target.value)
  const bothPasswordsAreEqual = inputPassword.value === inputRepeatPassword.value 

  removeRepeatPasswordParagraph()
  removeSubmitParagraph()

  if (bothPasswordsAreEqual) {
    insertParagraphIntoDOM(validRepeatedPassword)
  } else {
    insertParagraphIntoDOM(invalidRepeatedPassword)
  }

  if (!isPasswordValid) {
    insertParagraphIntoDOM(invalidPassword)
    return
  }

  insertParagraphIntoDOM(validPassword)
}

const showRepeatPasswordInfo = () => {
  const repeatPasswordIsValid = inputPassword.value === inputRepeatPassword.value

  removeSubmitParagraph()

  if (!repeatPasswordIsValid) {
    insertParagraphIntoDOM(invalidRepeatedPassword)
    return
  }

  insertParagraphIntoDOM(validRepeatedPassword)
}

const showSubmitInfo = e => {
  e.preventDefault()

  const isUsernameValid = testUsername(inputUsername.value)
  const isPasswordValid = testUsername(inputPassword.value)
  const repeatPasswordIsValid = inputRepeatPassword.value === inputPassword.value
  const usernameAndPasswordIsNotValid = !isUsernameValid || !isPasswordValid || !repeatPasswordIsValid

  if (repeatPasswordIsValid) {
    insertParagraphIntoDOM(validSubmitInfo)
  } else {
    insertParagraphIntoDOM(invalidRepeatedPassword)
  }

  if (usernameAndPasswordIsNotValid) {
    insertParagraphIntoDOM(invalidSubmitInfo)
    return 
  }

  insertParagraphIntoDOM(validSubmitInfo)
}

inputUsername.addEventListener('input', showUsernameInfo)
inputPassword.addEventListener('input', showPasswordInfo)
inputRepeatPassword.addEventListener('input', showRepeatPasswordInfo)
form.addEventListener('submit', showSubmitInfo)
