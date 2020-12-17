import * as React from 'react';
import PageLoader from 'app/shared/page-loader/page-loader';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }: { children: any }) => (<div>
  <PageLoader />
  <div className="max-w-screen-xl mx-auto">
    <div className="text-4xl text-center mb-4"><Link to="/">English Owl</Link></div>

    {children}

    <div className="text-center">English Owl 2021 (c)</div>
  </div>
</div>);


export default MainLayout;
