import { AppBar, Toolbar, Typography, Box, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@shared/config/i18n/languages';
import type { SelectChangeEvent } from '@mui/material';

interface HeaderProps {
    onMenuToggle: () => void;
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (event: SelectChangeEvent) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMenuToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    VDMS
                </Typography>
                <Box>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                            value={i18n.resolvedLanguage || i18n.language}
                            onChange={handleLanguageChange}
                            displayEmpty
                            sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' } }}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <MenuItem key={lang.code} value={lang.code}>
                                    {lang.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
