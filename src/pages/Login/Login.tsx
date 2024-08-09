import { useState } from 'react'
import logo from '../../assets/DataLynn_Logo_Stacked_Blue.png'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import GoogleSmall from '../../assets/images/google_small.svg'
// import { useBrowser } from 'hooks/useBrowser';
import { useNavigate } from 'react-router-dom'
import LoadingButton from '@mui/lab/LoadingButton'
// import {
//   useSignInMutation,
//   useUserQuery,
//   useSelector,
//   selectUser,
//   useDispatch,
//   setNeedSignInBackPath,
//   setCommonSnackbar,
// } from '../../store/store'
import Typography from '@mui/material/Typography'
// import { Link } from '@mui/material'
import { useMount } from 'ahooks'
import { goGoogleOneKeySign } from '../../utils'
import styles from './Login.module.less'

export default function Login() {
  useMount(() => {
    window.scrollTo(0, 0)
  })

  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  // const { needSignInBackPath } = useSelector(selectUser);

  // const [signIn, { isLoading: signInLoading }] = useSignInMutation()
  // const { refetch: userRefetch } = useUserQuery()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Simple email validation regex

  // const { isWechatBrowser } = useBrowser()
  function handleGoogleLogin() {
    // if (isWechatBrowser) {
    //   navigate('/use-default-browser')
    // } else {
    goGoogleOneKeySign()
    // }
  }

  const handleEmailBlur = () => {
    if (emailRegex.test(email)) {
      setEmailError(false)
    }
  }

  function handleClick(email, password) {
    return (event) => handleLogin(event, email, password)
  }

  async function handleLogin(event, email, password) {
    // event.preventDefault();
    // if (!emailRegex.test(email)) {
    //     setEmailError(true);
    //     return;
    // } else {
    //     setEmailError(false);
    // }
    // const loginData = {
    //     email: email,
    //     password: password,
    // };
    // signIn(loginData)
    //     .unwrap()
    //     .then(() => {
    //         userRefetch();
    //         const path = decodeURI(needSignInBackPath);
    //         if (path && path !== '/signup') {
    //             dispatch(setNeedSignInBackPath(''));
    //             navigate(path);
    //         } else {
    //             navigate('/');
    //         }
    //         dispatch(setCommonSnackbar({ severity: 'success', message: 'Sign in success.', open: true }));
    //     })
    //     .catch((error) => {
    //         if (error.code === 1004 || error.code === 1005) {
    //             dispatch(
    //                 setCommonSnackbar({
    //                     severity: 'error',
    //                     message: 'The username or password provided is incorrect.',
    //                     open: true,
    //                 }),
    //             );
    //         } else if (!error.code) {
    //             dispatch(
    //                 setCommonSnackbar({
    //                     severity: 'error',
    //                     message: error.data,
    //                     open: true,
    //                 }),
    //             );
    //         } else {
    //             dispatch(
    //                 setCommonSnackbar({
    //                     severity: 'error',
    //                     message: 'Unexpected error logging in. Please try again.',
    //                     open: true,
    //                 }),
    //             );
    //         }
    //     });
  }

  return (
    <div
      className={`${styles.wrapper} w-full h-full sm:w-7/12 md:w-5/12 max-w-[36rem] m-auto justify-center items-center inline-flex`}
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
            <div className="LoginIntoDatalynn text-[#000000E6] text-2xl font-medium">
              Login into DataLynn
            </div>
            <div className="Frame34168 self-stretch justify-start items-start gap-1 inline-flex">
              <div className="DonTHaveAnAccount  text-[#00000099] text-sm font-normal leading-tight tracking-tight">
                Don&apos;t have an account?
              </div>
              <div
                onClick={() => navigate('/signup')}
                className="SignUp cursor-pointer text-blue-600 text-sm font-normal leading-tight tracking-tight"
              >
                Sign Up
              </div>
            </div>
          </div>
          <div className="Frame63 self-stretch flex-col justify-start items-center gap-[1rem] flex">
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
                    id="outlined-basic"
                    variant="outlined"
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
                  <div className="Title  text-[#000000E6] text-base font-normal leading-normal tracking-tight">
                    Password
                  </div>
                </div>
                <div className="Textfield self-stretch flex-col justify-start items-start flex">
                  <div className="Textfield self-stretch flex-col justify-start items-start flex">
                    <TextField
                      required
                      // type={showPassword ? 'text' : 'password'}
                      type={'password'}
                      className="w-full"
                      id="outlined-basic"
                      variant="outlined"
                      size="small"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      // InputProps={{
                      //     endAdornment: (
                      //         <InputAdornment position="end">
                      //             <IconButton
                      //                 aria-label="toggle password visibility"
                      //                 onClick={() => setShowPassword((show) => !show)}
                      //                 onMouseDown={(event) => event.preventDefault()}
                      //                 edge="end"
                      //             >
                      //                 {showPassword ? <VisibilityOff /> : <Visibility />}
                      //             </IconButton>
                      //         </InputAdornment>
                      //     ),
                      // }}
                    />
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  navigate('/forgotpassword')
                }}
                className="ForgotPassword cursor-pointer self-stretch text-blue-600 text-sm font-normal leading-tight tracking-tight"
              >
                Forgot password?
              </div>
            </div>
          </div>
          <div className="w-full self-stretch flex-col justify-center items-center flex">
            <LoadingButton
              // loading={signInLoading}
              loadingPosition="center"
              variant="contained"
              className="w-full"
              size="large"
              type="submit"
              onClick={handleClick(email, password)}
              sx={{
                textTransform: 'none',
              }}
              disabled={emailError}
            >
              Sign In
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
                Sign in with Google
              </span>
            </Button>
          </div>
          <Typography variant="body2" className="text-[#00000099] self-start">
            By joining in, I agree to the <span>Terms of Service</span> and
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
