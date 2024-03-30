import React, { useState, useEffect } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Scroll event listener to show/hide the button
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsVisible(scrollTop > 100); // Show the button when scrolling down 100 pixels
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to the top when the button is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (

        <button className={`back-to-top-button ${isVisible ? 'visible' : 'hidden'}`} onClick={scrollToTop}><ArrowDropUpIcon style={{"color":"white"}}/></button>


    )
}
