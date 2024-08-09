/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Snackbar } from '@mui/material'
import {
  useSelector,
  selectApp,
  useDispatch,
  setCommonSnackbar,
} from '@/store/index'
// import { useEffect } from 'react'

export default function CommonSnackbar() {
  const app = useSelector(selectApp)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setCommonSnackbar({ open: false }))
  }

  // const handleScroll = () => {
  //   if (app.commonSnackbar.open) {
  //     dispatch(setCommonSnackbar({ open: false }))
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, { passive: true })

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [app.commonSnackbar.open])

  return (
    <Snackbar
      open={app.commonSnackbar.open}
      autoHideDuration={app.commonSnackbar.duration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
      sx={{ marginTop: '59px' }}
    >
      <Alert
        onClose={handleClose}
        severity={app.commonSnackbar.severity}
        sx={{ width: '100%' }}
      >
        {app.commonSnackbar.message}
      </Alert>
    </Snackbar>
  )
}
