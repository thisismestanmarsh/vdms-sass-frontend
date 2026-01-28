import { Container, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { usePermission, useUpdatePermission } from '@entities/permission/model/permissionHooks';
import type { PermissionRequest } from '@entities/permission/model/types';
import { PermissionForm } from '../PermissionForm/PermissionForm';

export const EditPermissionPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, isLoading: isFetching } = usePermission(id || '');
    const { mutate: updatePermission, isPending: isUpdating } = useUpdatePermission(id || '');

    const onSubmit = (formData: PermissionRequest) => {
        if (id) {
            updatePermission(formData, {
                onSuccess: () => {
                    navigate(ROUTES.PERMISSIONS);
                },
            });
        }
    };

    if (isFetching) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data?.data) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Typography color="error">Permission not found</Typography>
            </Box>
        );
    }

    const initialData: PermissionRequest = {
        action: data.data.action,
        description: data.data.description,
        module: data.data.module,
        name: data.data.name,
        resource: data.data.resource,
        scope: data.data.scope,
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <PermissionForm
                title={`Edit Permission: ${data.data.name}`}
                initialData={initialData}
                onSubmit={onSubmit}
                isLoading={isUpdating}
                onCancel={() => navigate(ROUTES.PERMISSIONS)}
            />
        </Container>
    );
};
