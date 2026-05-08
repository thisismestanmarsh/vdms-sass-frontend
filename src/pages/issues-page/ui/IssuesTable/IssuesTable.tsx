import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Box,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { getIssueEditPath } from '@shared/config/routes';
import { useIssues, useDeleteIssue } from '@entities/issue/model/issueHooks';
import { IS_DEMO_MODE } from '@shared/config/demo';
import { MOCK_ISSUES } from './demoData';

export const IssuesTable = () => {
    const navigate = useNavigate();
    const { data: apiIssues, isLoading: apiLoading } = useIssues();
    const { mutate: deleteIssue } = useDeleteIssue();

    const issues = IS_DEMO_MODE ? MOCK_ISSUES : apiIssues;
    const isLoading = IS_DEMO_MODE ? false : apiLoading;

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this issue?')) {
            deleteIssue(id);
        }
    };

    if (isLoading) {
        return <Typography>Loading issues...</Typography>;
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', borderRadius: '8px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="issues table">
                <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Issue</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Vehicles</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Segments</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Subissues</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {issues?.map((issue) => (
                        <TableRow key={issue.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {issue.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {issue.vehicles.map((v) => (
                                        <Chip key={v} label={v} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.75rem' }} />
                                    ))}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {issue.segments.map((s) => (
                                        <Chip key={s} label={s} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.75rem' }} />
                                    ))}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {issue.subIssues.map((sub) => (
                                        <Box key={sub.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: sub.color }} />
                                            <Typography variant="caption">{sub.name}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton size="small" onClick={() => navigate(getIssueEditPath(issue.id))} sx={{ color: 'primary.main' }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDelete(issue.id)} sx={{ color: 'error.main' }}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {(!issues || issues.length === 0) && (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No issues found.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
