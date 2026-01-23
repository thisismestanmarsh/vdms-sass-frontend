import {
    Container,
    Typography,
    Button,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@shared/config/i18n/languages';
import { useUserStore } from '@entities/user/model/userStore';

export const HomePage = () => {
    const { t, i18n } = useTranslation();
    const { authData, logout } = useUserStore();

    const handleLanguageChange = (event: SelectChangeEvent) => {
        i18n.changeLanguage(event.target.value);
    };

    if (!authData) return null;

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h1" gutterBottom>
                    {t('welcome')}, {authData.user.name}!
                </Typography>

                <Box sx={{ mt: 4, mb: 2, minWidth: 200, display: 'inline-block' }}>
                    <FormControl fullWidth>
                        <InputLabel id="language-select-label">Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={i18n.resolvedLanguage || i18n.language}
                            label="Language"
                            onChange={handleLanguageChange}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <MenuItem key={lang.code} value={lang.code}>
                                    {lang.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="outlined" color="error" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
