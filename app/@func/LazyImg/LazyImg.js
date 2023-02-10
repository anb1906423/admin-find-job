import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function LazyImg({ link = '', alt = '', onClick }) {
    const ref = useRef(null);

    const handleLoadImg = (img) => {
        const url = img.getAttribute('lazy-src');

        img.setAttribute('stc', url);
    };

    useEffect(() => {
        const img = ref.current;

        if (!img) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    handleLoadImg(entry.target);
                }
            });
        });

        observer.observe(img);
    }, [link, ref]);

    return (
        <>
            <img onClick={onClick} ref={ref} src="" alt={alt} lazy-src={link} />
        </>
    );
}

LazyImg.propTypes = {
    link: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onClick: PropTypes.func,
};

export default LazyImg;
