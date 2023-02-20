import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import Section from './Section';
import HeaderRight from './HeaderRight';

const Layout = ({ children }) => {
    const prams = useRouter();

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            Router.push('/dang-nhap');
        }
    }, [isLoggedIn]);

    return (
        <>
            {prams.pathname === '/dang-nhap'
                ? children
                : isLoggedIn && (
                      <div className="overflow-hidden">
                          <div className="layout row">
                              <div className="col-3">
                                  <Section />
                              </div>
                              <div className="cont col-9">
                                  <div className="render-children-layout">
                                      <HeaderRight />
                                      <div className="render-children">{children}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
        </>
    );
};

export default Layout;
