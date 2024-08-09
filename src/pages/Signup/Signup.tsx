import React, { useState, useEffect } from 'react'
import logo from '../../assets/DataLynn_Logo_Stacked_Blue.png'
import GoogleSmall from '../../assets/images/google_small.svg'
// import { useBrowser } from 'hooks/useBrowser';
import { useNavigate } from 'react-router-dom'
import styles from './Singup.module.less'
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  // Link,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
// import { useSignUpMutation, useDispatch, setCommonSnackbar } from 'store'
import { useMount } from 'ahooks'
import { goGoogleOneKeySign } from '../../utils'

export default function Signup() {
  useMount(() => {
    window.scrollTo(0, 0)
  })

  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Simple email validation regex
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  // const [signUp, { isLoading: signUpLoading }] = useSignUpMutation()

  let timeoutIndex

  useEffect(() => {
    return () => {
      clearTimeout(timeoutIndex)
    }
  }, [timeoutIndex])

  // const { isWechatBrowser } = useBrowser();
  function handleGoogleLogin() {
    // if (isWechatBrowser) {
    //     navigate('/use-default-browser');
    // } else {
    goGoogleOneKeySign()
    // }
  }

  const handleEmailBlur = () => {
    if (emailRegex.test(email)) {
      setEmailError(false)
    }
  }

  const handlePasswordBlur = () => {
    if (passwordRegex.test(password)) {
      setPasswordError(false)
    }
  }

  const handleNameBlur = () => {
    if (firstName !== '') {
      setFirstNameError(false)
    }

    if (lastName !== '') {
      setLastNameError(false)
    }
  }

  const handleClick = () => {
    return (event) => handleSignUp(event)
  }

  async function handleSignUp(event) {
    event.preventDefault()
    let isReturn = false
    if (!emailRegex.test(email)) {
      setEmailError(true)
      isReturn = true
    } else {
      setEmailError(false)
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(true)
      isReturn = true
    } else {
      setPasswordError(false)
    }

    if (firstName === '') {
      setFirstNameError(true)
      isReturn = true
    }

    if (lastName === '') {
      setLastNameError(true)
      isReturn = true
    }

    if (isReturn) {
      return
    }

    const signUpData = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
    }

    // signUp(signUpData)
    // .unwrap()
    // .then(() => {
    //   dispatch(
    //     setCommonSnackbar({
    //       severity: 'success',
    //       message: `You've successfully registered! A confirmation email has been sent to your registered email.`,
    //       open: true,
    //     }),
    //   )
    //   navigate('/signin')
    // })
    // .catch((err) => {
    //   console.error('🚀[SignUp err]', err)
    //   if (err.code) {
    //     dispatch(
    //       setCommonSnackbar({
    //         severity: 'error',
    //         message: err.message,
    //         open: true,
    //       }),
    //     )
    //   } else {
    //     dispatch(
    //       setCommonSnackbar({
    //         severity: 'error',
    //         message: err.data,
    //         open: true,
    //       }),
    //     )
    //   }
    // })
  }

  return (
    <div
      className={`${styles.wrapper} w-full sm:w-7/12 md:w-5/12 max-w-[36rem] m-auto bg-white justify-center items-center inline-flex`}
    >
      <div className="w-full px-[1rem] md:px-6 py-16 flex-col justify-center items-center gap-8 inline-flex">
        <div
          className="w-[9.39rem] justify-center items-center inline-flex cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={logo} className="w-full" />
        </div>
        <div className="Card self-stretch rounded-[20px] flex-col justify-start items-center gap-6 flex">
          <div className="ParagraphContainer self-stretch flex-col justify-start items-start gap-1 flex">
            <div className="LoginIntoDatalynn  text-[#000000E6] text-2xl font-medium">
              Get Started
            </div>
            <div className="Frame34168 self-stretch justify-start items-start gap-1 inline-flex">
              <div className="DonTHaveAnAccount  text-[#00000099] text-sm font-normal leading-tight tracking-tight">
                Already have an account?
              </div>
              <div
                onClick={() => navigate('/login')}
                className="SignUp cursor-pointer text-blue-600 text-sm font-normal leading-tight tracking-tight"
              >
                Sign In
              </div>
            </div>
          </div>
          <div className="Frame63 self-stretch flex-col justify-start items-center gap-[1rem] flex">
            <div className="Frame34171 self-stretch flex justify-between items-center gap-[1rem]">
              <div className="Input w-1/2 flex-col justify-start items-start gap-2 flex">
                <div className="Text self-stretch justify-start items-center gap-1 inline-flex">
                  <div className="Title  text-[#000000E6] text-base font-normal leading-normal tracking-tight">
                    First Name
                  </div>
                </div>
                <div className="Textfield self-stretch flex-col justify-start items-start flex">
                  <TextField
                    required
                    className="w-full"
                    id="first-name"
                    variant="outlined"
                    placeholder=""
                    size="small"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={handleNameBlur}
                    error={firstNameError}
                    helperText={
                      firstNameError ? 'This field cannot be left empty.' : ''
                    }
                  />
                </div>
              </div>
              <div className="Input w-1/2 flex-col justify-start items-start gap-2 flex">
                <div className="Text self-stretch justify-start items-center gap-1 inline-flex">
                  <div className="Title  text-[#000000E6] text-base font-normal leading-normal tracking-tight">
                    Last Name
                  </div>
                </div>
                <div className="Textfield self-stretch flex-col justify-start items-start flex">
                  <TextField
                    required
                    className="w-full"
                    id="last-name"
                    variant="outlined"
                    placeholder=""
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={handleNameBlur}
                    error={lastNameError}
                    helperText={
                      lastNameError ? 'This field cannot be left empty.' : ''
                    }
                  />
                </div>
              </div>
            </div>
            <div className="Frame34171 self-stretch flex-col justify-start items-center gap-[5px] flex">
              <div className="Input self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="Text self-stretch justify-start items-center gap-1 inline-flex">
                  <div className="Title  text-[#000000E6] text-base font-normal leading-normal tracking-tight">
                    Email
                  </div>
                </div>
                <div className="Textfield self-stretch flex-col justify-start items-start flex">
                  <TextField
                    required
                    type="email"
                    className="w-full"
                    id="password"
                    variant="outlined"
                    placeholder=""
                    size="small"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur} // 当失去焦点时，触发邮箱校验
                    error={emailError} // 如果邮箱不符合要求，显示错误状态
                    helperText={emailError ? 'Invalid email format' : ''} // 显示错误文本
                  />
                </div>
              </div>
            </div>
            <div className="Frame34172 self-stretch flex-col justify-start items-center gap-[5px] flex">
              <div className="Input self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="Text self-stretch justify-start items-center gap-1 inline-flex">
                  <div className="Title text-[#000000E6] text-base font-normal leading-normal tracking-tight">
                    Password
                    <span className=" text-[#00000099]"> (min. 8 char)</span>
                  </div>
                </div>
                <div className="Textfield self-stretch flex-col justify-start items-start flex">
                  <div className="Textfield self-stretch flex-col justify-start items-start flex">
                    <TextField
                      required
                      type="password"
                      className="w-full"
                      id="outlined-basic"
                      variant="outlined"
                      placeholder=""
                      size="small"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handlePasswordBlur}
                      error={passwordError}
                      helperText={
                        passwordError ? (
                          <List dense={true} sx={{ p: 0, m: 0 }}>
                            <ListItem dense={true} sx={{ p: 0 }}>
                              Password must be at least 8 characters long.
                            </ListItem>
                            <ListItem dense={true} sx={{ p: 0 }}>
                              - Contain at least one uppercase letter.
                            </ListItem>
                            <ListItem dense={true} sx={{ p: 0 }}>
                              - Contain at least one lowercase letter.
                            </ListItem>
                            <ListItem dense={true} sx={{ p: 0 }}>
                              - Contain at least one number.
                            </ListItem>
                            <ListItem dense={true} sx={{ p: 0 }}>
                              - Include one of the following special characters:
                              ! @ # $ % ^ & *
                            </ListItem>
                          </List>
                        ) : (
                          ''
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full self-stretch flex-col justify-center items-center flex">
            <LoadingButton
              // loading={signUpLoading}
              loadingPosition="center"
              variant="contained"
              className="w-full"
              size="large"
              type="submit"
              onClick={handleClick()}
              sx={{
                textTransform: 'none',
              }}
              disabled={
                firstName === '' ||
                lastName === '' ||
                password === '' ||
                email === ''
              }
            >
              Sign Up
            </LoadingButton>
          </div>
          <div className="Or self-stretch flex-col justify-start items-center gap-6 flex">
            <div className="Frame71 self-stretch justify-center items-center gap-4 inline-flex">
              <div className="Line3 grow shrink basis-0 h-[1px] border border-black border-opacity-10"></div>
              <div className="Or text-center  text-[#00000099] text-base font-normal leading-normal tracking-tight">
                or
              </div>
              <div className="Line4 grow shrink basis-0 h-[1px] border border-black border-opacity-10"></div>
            </div>
            <Button
              className="w-full gap-4 py-2"
              // color="black"
              variant="outlined"
              size="large"
              disableElevation
              sx={{
                textTransform: 'none',
                borderColor: 'rgba(0, 0, 0, 0.23)',
              }}
              onClick={handleGoogleLogin}
            >
              <img src={GoogleSmall} />
              <span className="text-[#000000E6] text-[15px] font-bold leading-normal">
                Sign up with Google
              </span>
            </Button>
          </div>
          <Typography variant="body2" className="text-[#00000099] self-start">
            By joining in, I agree to the <span>Terms and Services</span> and
            <span> Private Policy</span>
            {/* <Link
                            href="/terms"
                            variant="body2"
                            className="text-inherit hover:text-black"
                            text
                            sx={{ textUnderlineOffset: '0.18rem', textDecorationColor: 'inherit' }}
                        >
                            Terms of Service
                        </Link>
                        &nbsp;and&nbsp;
                        <Link
                            href="/privacy"
                            variant="body2"
                            className="text-inherit hover:text-black"
                            text
                            sx={{ textUnderlineOffset: '0.18rem', textDecorationColor: 'inherit' }}
                        >
                            Privacy Policy
                        </Link> */}
          </Typography>
        </div>
      </div>
    </div>
  )
}
