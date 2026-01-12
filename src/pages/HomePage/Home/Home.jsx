import React from 'react';
import Banner from '../Banner/Banner';
import Coverage from '../Coverage/Coverage';
import Features from '../Features/Features';
import Services from '../Services/Services';
import ChooseUs from '../ChooseUs/ChooseUs';
import HowItWorks from '../HowItWorks/HowItWorks';
import Testimonials from '../Testimonials/Testimonials';
import TrustedBy from '../TrustedBy/TrustedBy';
import FAQ from '../FAQ/FAQ';
import Newsletter from '../Newsletter/Newsletter';
import CallToAction from '../CallToAction/CallToAction';

const Home = () => {
    return (
        <div>
            <Banner />
            <Features />
            <Services />
            <Coverage />
            <ChooseUs />
            <HowItWorks />
            <Testimonials />
            <TrustedBy />
            <FAQ />
            <Newsletter />
            <CallToAction />
        </div>
    );
};

export default Home;