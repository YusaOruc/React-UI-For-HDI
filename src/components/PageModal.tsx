import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Stack,
  Typography,
  alpha,
  darken,
  lighten,
  useMediaQuery,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import React, { PropsWithChildren, useState } from "react";
import { Fullscreen, Minimize } from "@mui/icons-material";

interface IAppModalProps extends PropsWithChildren {
  innerRef?: any;
  fullScreen?: boolean;
  title?: string;
  isOpen: boolean;
  handleClose: any;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
  backgroundColor?: string;
  minHeight?: string | number;
}

const PageModal: React.FC<IAppModalProps> = (props) => {
  const theme = useTheme();

  const fullScreenMediaQuery = useMediaQuery(theme.breakpoints.down("md"));
  const {
    children,
    title = "Detay",
    handleClose,
    isOpen = false,
    maxWidth = "md",
    fullWidth = true,
    backgroundColor,
    minHeight,
    fullScreen,
  } = props;
  const [modalFullScreen, setModalFullScreen] = useState(false);
  const handleModalSize = () => {
    setModalFullScreen(!modalFullScreen);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreenMediaQuery || fullScreen || modalFullScreen}
      hideBackdrop
      aria-labelledby="form-dialog-title"
      scroll="paper"
      sx={{
        "& .MuiDialog-paper	": {
          minHeight: minHeight,
        },
      }}
    >
      <Stack direction="row" alignItems="center">
        <Typography sx={{ ml: 3 }}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        {!fullScreen && !fullScreenMediaQuery && (
          <>
            {modalFullScreen ? (
              <IconButton
                aria-label="Minimize"
                onClick={handleModalSize}
                size="large"
              >
                <Minimize />
              </IconButton>
            ) : (
              <IconButton
                aria-label="Maximize"
                onClick={handleModalSize}
                size="large"
              >
                <Fullscreen />
              </IconButton>
            )}
          </>
        )}
        <IconButton aria-label="Close" onClick={handleClose} size="large">
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent
        dividers
        sx={(theme) => ({
          backgroundColor: backgroundColor,
          display: "flex",
          flexDirection: "column",
          borderTop: `1px solid ${
            theme.palette.mode === "light"
              ? lighten(alpha(theme.palette.divider, 1), 0.88)
              : darken(alpha(theme.palette.divider, 1), 0.68)
          }`,

          p: 3,
        })}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default React.forwardRef<any, any>((props, ref) => (
  <PageModal {...props} innerRef={ref} />
));
