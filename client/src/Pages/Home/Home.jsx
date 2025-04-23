import React from 'react'
import BannerCarousel from './BannerCarousel'
import HomeSection2 from './HomeSection2'
import HomeSection3 from './HomeSection3'
import HomeSection4 from './HomeSection4';

export default function Home() {
  return (
    <div>
      <BannerCarousel/>
      <HomeSection2/>
      <HomeSection3/>
      <HomeSection4/>
    </div>
  )
}
