'use client';
import { ReactNode, useState } from 'react';
import {
  AppBar as MuiAppBar, Box, CssBaseline, Divider, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, ThemeProvider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import {
  useTheme,
} from '@mui/material/styles';
import LangSwitcher from 'components/LangSwitcher';
import GitHubProjectLink from 'components/GitHubProjectLink';
import { i18n } from '../../next-i18next.config';
import defaultTheme from './theme';
import './globals.css'

const drawerWidth = 240;

interface LayoutProps {
  container?: Element,
  children: ReactNode,
}

export default function Layout({ children }: LayoutProps) {
  const currentLocale = this.props.__NEXT_DATA__.locale || i18n.defaultLocale;
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function Drawer() {
    const theme = useTheme();
    return (
      <Box sx={{ width: drawerWidth, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
        <Box sx={theme.mixins.toolbar} />
        <Divider />
        <List>
          {['Info'].map((text) => (
            <ListItem button key={text} sx={{
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
              },
            }}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: theme.palette.primary.contrastText }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  function AppBar() {
    return (
      <MuiAppBar position="fixed" sx={{ width: '100%' }}>
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
      </MuiAppBar>
    );
  }

  function DrawerBox() {
    const theme = useTheme();
    return (
      <Box
        component='nav'
        textAlign='center'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="folders"
        display='contents'
      >
        <MuiDrawer
          variant="temporary"
          anchor='left'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { backgroundColor: theme.palette.primary.main, boxSizing: 'border-box', width: drawerWidth },
          }}
          ModalProps={{ keepMounted: true }}
        >
          <Drawer />
        </MuiDrawer>
      </Box>
    );
  }

  return (
    <html lang={currentLocale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ color: defaultTheme.palette.primary.contrastText, display: 'flex', maxHeight: '100vh' }}>
            <CssBaseline />
            <AppBar />
            <DrawerBox />
            {children}
          </Box>
        </ThemeProvider>
      </body>
      <footer>
        <GitHubProjectLink owener='poad' repo='next-i18n-example' />
      </footer>
    </html>
  );
}
