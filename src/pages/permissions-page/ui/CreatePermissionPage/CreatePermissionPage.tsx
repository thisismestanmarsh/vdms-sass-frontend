import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';
import { useCreatePermission } from '@entities/permission/model/permissionHooks';
import type { PermissionRequest } from '@entities/permission/model/types';
import { PermissionForm } from '../PermissionForm/PermissionForm';

export const CreatePermissionPage = () => {
    const navigate = useNavigate();
    const { mutate: createPermission, isPending } = useCreatePermission();

    const onSubmit = (data: PermissionRequest) => {
        createPermission(data, {
            onSuccess: () => {
                navigate(ROUTES.PERMISSIONS);
            },
        });
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <PermissionForm
                title="Create New Permission"
                onSubmit={onSubmit}
                isLoading={isPending}
                onCancel={() => navigate(ROUTES.PERMISSIONS)}
            />
        </Container>
    );
};
