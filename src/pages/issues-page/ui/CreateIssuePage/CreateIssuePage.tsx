import { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    IconButton,
    Divider,
    MenuItem,
    Chip,
    Select,
    FormControl,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ROUTES } from '@shared/config/routes';
import { useCreateIssue, useUpdateIssue, useIssue } from '@entities/issue/model/issueHooks';
import type { Translation, SubIssue } from '@entities/issue/model/types';

const LANGUAGES = [
    { code: 'hi', label: 'Hindi' },
    { code: 'ar', label: 'Arabic' },
    { code: 'fr', label: 'French' },
    { code: 'es', label: 'Spanish' },
    { code: 'de', label: 'German' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ja', label: 'Japanese' },
];

const VEHICLE_TYPES = ['EV', 'CNG', 'Petrol', 'Diesel', 'Hybrid', 'Hydrogen'];
const SEGMENTS = ['EV', 'PV', '3W', '4W', 'L5', 'N1', 'M1'];
const COLORS = ['#ff6b00', '#00c853', '#6200ea', '#d32f2f', '#1976d2', '#e91e63', '#9c27b0', '#00bcd4'];

export const CreateIssuePage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;
    const { data: initialData } = useIssue(id || '');
    const { mutate: createIssue } = useCreateIssue();
    const { mutate: updateIssue } = useUpdateIssue(id || '');

    const [name, setName] = useState(initialData?.name || '');
    const [translations, setTranslations] = useState<Translation[]>(initialData?.translations || []);
    const [vehicles, setVehicles] = useState<string[]>(initialData?.vehicles || []);
    const [segments, setSegments] = useState<string[]>(initialData?.segments || []);
    const [subIssues, setSubIssues] = useState<Omit<SubIssue, 'id'>[]>(
        initialData?.subIssues.map(({ id: _, ...rest }) => rest) || [
            { name: '', translations: [], vehicleTypes: [], vehicleSegments: [], color: COLORS[0] },
        ]
    );

    const handleAddTranslation = (target: 'main' | number) => {
        if (target === 'main') {
            setTranslations([...translations, { language: 'hi', name: '' }]);
        } else {
            const newSubIssues = [...subIssues];
            newSubIssues[target].translations = [
                ...(newSubIssues[target].translations || []),
                { language: 'hi', name: '' },
            ];
            setSubIssues(newSubIssues);
        }
    };

    const handleTranslationChange = (
        target: 'main' | number,
        index: number,
        field: keyof Translation,
        value: string
    ) => {
        if (target === 'main') {
            const newTranslations = [...translations];
            newTranslations[index] = { ...newTranslations[index], [field]: value };
            setTranslations(newTranslations);
        } else {
            const newSubIssues = [...subIssues];
            const subIssueTranslations = [...(newSubIssues[target].translations || [])];
            subIssueTranslations[index] = { ...subIssueTranslations[index], [field]: value };
            newSubIssues[target].translations = subIssueTranslations;
            setSubIssues(newSubIssues);
        }
    };

    const handleAddSubIssue = () => {
        setSubIssues([
            ...subIssues,
            { name: '', translations: [], vehicleTypes: [], vehicleSegments: [], color: COLORS[0] },
        ]);
    };

    const handleRemoveSubIssue = (index: number) => {
        setSubIssues(subIssues.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        const payload = {
            name,
            translations,
            vehicles,
            segments,
            subIssues,
        };

        if (isEdit) {
            updateIssue(payload as any, { onSuccess: () => navigate(ROUTES.ISSUES) });
        } else {
            createIssue(payload as any, { onSuccess: () => navigate(ROUTES.ISSUES) });
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Button
                    startIcon={<ArrowBackIosIcon sx={{ fontSize: '0.75rem !important' }} />}
                    onClick={() => navigate(ROUTES.ISSUES)}
                    sx={{ textTransform: 'none', color: 'primary.main', mb: 1, p: 0 }}
                >
                    Go back
                </Button>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {isEdit ? 'Edit Issue' : 'Add Issue'}
                </Typography>
            </Box>

            <Paper sx={{ p: 4, borderRadius: '8px', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Issue Name
                        </Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Enter Issue Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>

                    {translations.map((t, i) => (
                        <Grid key={i} size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    Issue Name ({LANGUAGES.find((l) => l.code === t.language)?.label})
                                </Typography>
                                <IconButton size="small" onClick={() => setTranslations(translations.filter((_, idx) => idx !== i))}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </Box>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder={`Enter Issue Name In ${LANGUAGES.find((l) => l.code === t.language)?.label}`}
                                value={t.name}
                                onChange={(e) => handleTranslationChange('main', i, 'name', e.target.value)}
                            />
                        </Grid>
                    ))}

                    <Grid size={{ xs: 12 }}>
                        <Button
                            startIcon={<AddIcon />}
                            onClick={() => handleAddTranslation('main')}
                            sx={{ textTransform: 'none', color: 'primary.main' }}
                        >
                            Add Language
                        </Button>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Vehicles
                        </Typography>
                        <FormControl fullWidth size="small">
                            <Select
                                multiple
                                value={vehicles}
                                onChange={(e) => setVehicles(e.target.value as string[])}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" />
                                        ))}
                                    </Box>
                                )}
                            >
                                {VEHICLE_TYPES.map((type) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                            Vehicle Segment
                        </Typography>
                        <FormControl fullWidth size="small">
                            <Select
                                multiple
                                value={segments}
                                onChange={(e) => setSegments(e.target.value as string[])}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" />
                                        ))}
                                    </Box>
                                )}
                            >
                                {SEGMENTS.map((seg) => (
                                    <MenuItem key={seg} value={seg}>{seg}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Divider />
                    </Grid>

                    {subIssues.map((sub, subIdx) => (
                        <Grid key={subIdx} size={{ xs: 12 }} container spacing={2} sx={{ mb: 2 }}>
                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Sub-issue {subIdx + 1}
                                </Typography>
                                {subIssues.length > 1 && (
                                    <IconButton color="error" onClick={() => handleRemoveSubIssue(subIdx)}>
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Sub-issue Name</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Enter sub-issue name"
                                    value={sub.name}
                                    onChange={(e) => {
                                        const newSubIssues = [...subIssues];
                                        newSubIssues[subIdx].name = e.target.value;
                                        setSubIssues(newSubIssues);
                                    }}
                                />
                            </Grid>

                            {sub.translations?.map((t, tIdx) => (
                                <Grid key={tIdx} size={{ xs: 12, md: 3 }}>
                                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                        Sub-issue Name ({LANGUAGES.find((l) => l.code === t.language)?.label})
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={t.name}
                                        onChange={(e) => handleTranslationChange(subIdx, tIdx, 'name', e.target.value)}
                                    />
                                </Grid>
                            ))}

                            <Grid size={{ xs: 12, md: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Vehicle Type</Typography>
                                <FormControl fullWidth size="small">
                                    <Select
                                        multiple
                                        value={sub.vehicleTypes}
                                        onChange={(e) => {
                                            const newSubIssues = [...subIssues];
                                            newSubIssues[subIdx].vehicleTypes = e.target.value as string[];
                                            setSubIssues(newSubIssues);
                                        }}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} size="small" />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {VEHICLE_TYPES.map((type) => (
                                            <MenuItem key={type} value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Vehicle Segment</Typography>
                                <FormControl fullWidth size="small">
                                    <Select
                                        multiple
                                        value={sub.vehicleSegments}
                                        onChange={(e) => {
                                            const newSubIssues = [...subIssues];
                                            newSubIssues[subIdx].vehicleSegments = e.target.value as string[];
                                            setSubIssues(newSubIssues);
                                        }}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} size="small" />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {SEGMENTS.map((seg) => (
                                            <MenuItem key={seg} value={seg}>{seg}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 2 }}>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Color</Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    value={sub.color}
                                    onChange={(e) => {
                                        const newSubIssues = [...subIssues];
                                        newSubIssues[subIdx].color = e.target.value;
                                        setSubIssues(newSubIssues);
                                    }}
                                >
                                    {COLORS.map((c) => (
                                        <MenuItem key={c} value={c}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: c }} />
                                                {c}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Button
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={() => handleAddTranslation(subIdx)}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Add Language
                                </Button>
                            </Grid>
                        </Grid>
                    ))}

                    <Grid size={{ xs: 12 }}>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddSubIssue}
                            sx={{ textTransform: 'none', borderRadius: '8px' }}
                        >
                            Add Sub-issue
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate(ROUTES.ISSUES)}
                    sx={{ borderRadius: '8px', textTransform: 'none', px: 4 }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ borderRadius: '8px', textTransform: 'none', px: 4, bgcolor: 'primary.main' }}
                >
                    {isEdit ? 'Update Issue' : 'Add Issue'}
                </Button>
            </Box>
        </Box>
    );
};
