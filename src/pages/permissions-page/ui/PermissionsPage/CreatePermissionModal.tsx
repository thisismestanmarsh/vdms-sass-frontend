import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    CircularProgress,
} from '@mui/material';
import { useCreatePermission } from '@entities/permission/model/permissionHooks';
import type { PermissionRequest } from '@entities/permission/model/types';
import { PermissionForm } from '../PermissionForm/PermissionForm';

interface CreatePermissionModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreatePermissionModal = ({ open, onClose }: CreatePermissionModalProps) => {
    const { mutate: createPermission, isPending } = useCreatePermission();

    const onSubmit = (data: PermissionRequest) => {
        createPermission(data, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create New Permission</DialogTitle>
            <DialogContent>
                {isPending ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={{ mt: 1 }}>
                        <PermissionForm
                            onSubmit={onSubmit}
                            isLoading={isPending}
                            onCancel={onClose}
                            isModal={true}
                        />
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};
