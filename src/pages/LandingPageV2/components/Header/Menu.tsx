import React from 'react'
import { List, ListItem, ListItemText, Tabs, Tab } from '@mui/material'
import { useIntl } from 'react-intl'

const Menu = ({ isMobile }) => {
  const intl = useIntl()
  const handleScroll = (sectionId) => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (newValue:any) => {
    setValue(newValue)
    switch (newValue) {
      case 0:
        handleScroll('#Hero')
        break
      case 1:
        handleScroll('#Pricing')
        break
      case 2:
        handleScroll('#Students')
        break
      default:
        break
    }
  }

  if (isMobile) {
    return (
      <List component="nav" aria-label="main menu">
        <ListItem onClick={() => handleScroll('#Hero')}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem onClick={() => handleScroll('#Pricing')}>
          <ListItemText primary="Pricing" />
        </ListItem>
        <ListItem onClick={() => handleScroll('#Students')}>
          <ListItemText primary="Testimonial" />
        </ListItem>
      </List>
    )
  } else {
    return (
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        centered
      >
        <Tab
          label={intl.formatMessage({ id: 'lp.header.home' })}
          sx={{ color: 'black' }}
        />
        <Tab
          label={intl.formatMessage({ id: 'lp.header.pricing' })}
          sx={{ color: 'black' }}
        />
        <Tab
          label={intl.formatMessage({ id: 'lp.header.testimonial' })}
          sx={{ color: 'black' }}
        />
      </Tabs>
    )
  }
}

export default Menu
