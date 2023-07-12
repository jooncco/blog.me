import HomeBanner from '@/components/home/HomeBanner';
import {Typography} from './provider';
import {H2} from '@/components/Headers';
import React from 'react';
import Testimonials from '@/components/home/Testimonials';

export default function Home(): JSX.Element {
  return (
    <div>
      <Typography variant="h1" className="my-6">
        About
      </Typography>
      <HomeBanner />
      <H2 className="mt-10 mb-4">Testimonials</H2>
      <Testimonials />
      <H2 className="mt-10 mb-4">Recent Activity</H2>
      <p className="my-5 px-4">My recent activity.</p>
      <H2 className="mt-10 mb-4">Portfolio</H2>
      <p className="my-5 px-4">My artworks.</p>
      <H2 className="mt-10 mb-4">Donation</H2>
      <p className="my-5 px-4">Buy me a cup of coffee.</p>
    </div>
  );
}
