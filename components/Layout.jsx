import React from 'react';
import Section from './Section';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
    const prams = useRouter();

    console.log(prams.pathname);

    return (
        <>
            {prams.pathname === '/dang-nhap' ? (
                children
            ) : (
                <div className="overflow-hidden">
                    <div className="layout row">
                        <div className="col-3">
                            <Section />
                        </div>
                        <div className="cont col-9">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Layout;
