import { PropsWithChildren, useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import LangSwitcher from 'components/LangSwitcher';
import GitHubProjectLink from 'components/GitHubProjectLink';

const drawerWidth = 240;

interface LayoutProps {
  container?: Element;
  title?: string | null;
}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
  const { container, title } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Box sx={theme.mixins.toolbar} />
      <Divider />
      <List>
        {['Info'].map((text) => (
          <ListItem
            key={text}
            sx={{
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon
                sx={{ color: theme.palette.primary.contrastText }}
              />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const appBar = (
    <AppBar position="fixed" sx={{ width: '100%' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}></Typography>
        <LangSwitcher />
      </Toolbar>
    </AppBar>
  );

  const drawerBox = (
    <Box
      component="nav"
      textAlign="center"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="folders"
      display="contents"
    >
      <Drawer
        container={container}
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.primary.main,
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </Box>
  );

  return (
    <>
      <Head>
        <title>
          {title
            ? title.concat(' - ', t('common:appName'))
            : t('common:appName')}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{
          color: theme.palette.primary.contrastText,
          display: 'flex',
          maxHeight: '100vh',
        }}
      >
        <CssBaseline />
        {appBar}
        {drawerBox}
        {props.children}
      </Box>

      <footer>
        <GitHubProjectLink owener="poad" repo="next-i18n-example" />
      </footer>
    </>
  );
};

export default Layout;
