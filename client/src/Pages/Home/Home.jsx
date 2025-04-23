import React from 'react'
import BannerCarousel from './BannerCarousel'
import HomeSection2 from './HomeSection2'
import HomeSection3 from './HomeSection3'
import HomeSection4 from './HomeSection4';
import HomeSection5 from './HomeSection5';
import HomeSection6 from './HomeSection6';
import HomeAbout from './HomeAbout';
import CustomerReviews from './CustomerReviews';

export default function Home() {
  return (
    <div>
      <BannerCarousel/>
      <HomeSection2/>
      <HomeSection3/>
      <HomeSection4/>
      <HomeSection5/>
      <HomeSection6/>
      <HomeAbout/>
      <CustomerReviews/>
    </div>
  )
}
