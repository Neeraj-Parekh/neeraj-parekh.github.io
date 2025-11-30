'use client';

import Navigation from '@/components/Navigation';
import Watermark from '@/components/Watermark';
import ThemeToggle from '@/components/ThemeToggle';
import RotatingText from '@/components/RotatingText';
import CollapsibleJourney from '@/components/CollapsibleJourney';
import PhotoGallery from '@/components/PhotoGallery';
import personalData from '@/data/personal.json';
import shotsData from '@/data/shots.json';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Watermark />
      
      {/* Theme Toggle - Fixed Position */}
      <div className="theme-toggle-fixed">
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="mt-4">
        {/* Hero Section */}
        <div className="aali_tm_hero">
          <div className="container">
            <div className="hero_inner flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
              {/* Left side - Name + Rotating Text */}
              <div className="content text-center lg:text-left">
                <h2 className="hero-name">{personalData.name}</h2>
                <RotatingText texts={personalData.rotatingTexts} />
              </div>
              
              {/* Right side - Profile image with decorative boxes */}
              <div className="avatar-container">
                <span className="avatar-box box-one"></span>
                <span className="avatar-box box-two"></span>
                <span className="avatar-box box-three"></span>
                <span className="avatar-box box-five"></span>
                <div className="avatar-image-wrapper">
                  <img
                    src={personalData.profileImage}
                    alt={personalData.name}
                    className="avatar-image"
                  />
                </div>
                <span className="stroke-text">Nee</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <section id="whoami" className="about-section mt-12">
          <div className="container">
            <div className="about-container">
              <div className="w-full">
                <span className="about-label">VALUES</span>
                <div className="about-content">
                  <h3 className="about-title">More About Me</h3>
                  
                  <div className="about-info">
                    <p><strong>Name:</strong> {personalData.name}</p>
                    <p><strong>Location:</strong> {personalData.location}</p>
                    <p><strong>Email:</strong> {personalData.email}</p>
                    <p><strong>Profession:</strong> {personalData.profession}</p>
                  </div>

                  <p className="about-bio">
                    {personalData.bio}
                  </p>

                  <div className="about-qa">
                    <div className="about-question">
                      <h4>What are your favorite hobbies?</h4>
                      <p>{personalData.hobbies}</p>
                    </div>

                    <div className="about-question">
                      <h4>Accomplishments:</h4>
                      <p>{personalData.accomplishments}</p>
                    </div>

                    <div className="about-question">
                      <h4>What&apos;s your dream job?</h4>
                      <p>{personalData.dreamJob}</p>
                    </div>

                    <div className="about-question">
                      <h4>Values:</h4>
                      <p>{personalData.values}</p>
                    </div>

                    <div className="about-question">
                      <h4>History:</h4>
                      <p>{personalData.history}</p>
                    </div>

                    <div className="about-question">
                      <h4>Education and Training:</h4>
                      <p>{personalData.education}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="about-me-intro-section"
          className="section mt-12 mb-16"
          style={{ display: 'block' }}
        >
          <p className="mb-4 body-regular opacity-80 max-w-md">
            Feel free to reach out if you&apos;d like to collaborate or just want to connect!
          </p>
          <a
            href={`mailto:${personalData.email}`}
            className="btn-apple"
          >
            Get in touch
          </a>
        </section>

        {/* Timeline Section - Collapsible Journey */}
        <section id="timeline-section" className="mt-16 mb-16">
          <CollapsibleJourney />
        </section>

        {/* My Clicks - Photo Gallery */}
        <section id="my-clicks" className="mt-16 mb-16">
          <h2 className="headline-medium mb-2">MY CLICKS</h2>
          <p className="body-regular opacity-60 mb-8">A collection of moments I&apos;ve captured</p>
          <PhotoGallery photos={shotsData} basePath="/assets/shots" />
        </section>
      </main>
    </div>
  );
}
