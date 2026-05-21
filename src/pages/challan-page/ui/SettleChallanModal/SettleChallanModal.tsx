import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useState, useRef } from 'react';

interface SettleChallanModalProps {
  open: boolean;
  onClose: () => void;
  onSettle: (amount: string, files: File[]) => void;
}

export const SettleChallanModal = ({ open, onClose, onSettle }: SettleChallanModalProps) => {
  const [amount, setAmount] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSettle = () => {
    onSettle(amount, files);
    setAmount('');
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleViewFile = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '12px', bgcolor: 'background.default', backgroundImage: 'none' } }}>
      <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>Settle Challan</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
              Settled Amount
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter settled amount"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val)) {
                  setAmount(val);
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Payment Evidence
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                <InfoOutlinedIcon fontSize="small" />
                <Typography variant="body2">
                  upload screenshot of payment or receipt here
                </Typography>
              </Box>
            </Box>
            
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: '8px',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                bgcolor: 'rgba(255, 107, 0, 0.05)',
                '&:hover': {
                  bgcolor: 'rgba(255, 107, 0, 0.1)',
                },
              }}
            >
              <input
                type="file"
                multiple
                hidden
                ref={fileInputRef}
                accept=".jpg,.png,.pdf"
                onChange={handleFileChange}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', mb: 1 }}>
                <FileUploadOutlinedIcon />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Upload Evidence
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                ( jpg, png, pdf )
              </Typography>
            </Box>

            {files.length > 0 && (
              <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {files.map((f, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: '8px', bgcolor: 'background.paper' }}>
                    <Box 
                      sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}
                      onClick={() => handleViewFile(f)}
                    >
                      <InsertDriveFileIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap sx={{ maxWidth: 300, fontWeight: 500, color: 'primary.main', textDecoration: 'underline' }}>
                        {f.name}
                      </Typography>
                    </Box>
                    <IconButton size="small" onClick={() => removeFile(i)} sx={{ p: 0.5 }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSettle}
          disabled={!amount}
          sx={{ borderRadius: '8px', py: 1.5, textTransform: 'none', fontSize: '1rem', fontWeight: 600 }}
        >
          Settle Challan
        </Button>
      </DialogActions>
    </Dialog>
  );
};
