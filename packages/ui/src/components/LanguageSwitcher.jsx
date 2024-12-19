import { IconButton, Menu, MenuItem } from '@mui/material'
import { IconLanguage } from '@tabler/icons-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
    const { i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
        handleClose()
    }

    return (
        <>
            <IconButton
                color="inherit"
                onClick={handleClick}
                size="medium"
                sx={{
                    padding: '8px',
                    backgroundColor: 'secondary.light',
                    color: 'secondary.dark',
                    '&:hover': {
                        backgroundColor: 'secondary.dark',
                        color: 'secondary.light'
                    }
                }}
            >
                <IconLanguage stroke={1.5} size="1.3rem" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
                <MenuItem onClick={() => changeLanguage('zh')}>中文</MenuItem>
            </Menu>
        </>
    )
}

export default LanguageSwitcher 