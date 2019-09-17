import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import * as React from 'react';
import PageLoader from 'app/shared/page-loader/page-loader';

const MainLayout = ({ children }: { children: any }) => (<div>
  <PageLoader />
  <Container maxWidth="lg">
    <Toolbar>
       <Typography
         component="h2"
         variant="h5"
         color="inherit"
         align="center"
         noWrap
         style={{flex: 1}}
       >
         Lingualtool
       </Typography>
      {/*<Button variant="outlined" size="small" className='mr-2'>*/}
      {/*  Войти*/}
      {/*</Button>*/}
      {/*<Button variant="outlined" size="small">*/}
      {/*  Зарегистрироваться*/}
      {/*</Button>*/}
    </Toolbar>

    {children}

  </Container>
</div>);


export default MainLayout;
