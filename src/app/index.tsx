import * as React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import MainLayout from 'app/layouts/MainLayout';
import Index from 'app/pages/index/index';
import Watch from 'app/pages/watch/watch';
import NotFound from 'app/pages/not-found/not-found';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export const App = hot(module)(() => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      <Route path="/" exact render={() => <MainLayout><Index /></MainLayout>} />
      <Route path="/watch/:id" exact render={({ match }) => <MainLayout><Watch videoId={match.params.id} /></MainLayout>} />
      <Route render={() => <MainLayout><NotFound /></MainLayout>}/>
    </Switch>
  </MuiThemeProvider>
));
