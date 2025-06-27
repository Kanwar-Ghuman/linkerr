"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { Icons } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Head>
        <title>Job Connect - Your Bridge to Opportunities</title>
        <meta
          name="description"
          content="A platform connecting students with employers. Discover jobs, get matched, and kickstart your career."
        />
      </Head>
      <main className="font-sans">
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-screen bg-[#5772FD] flex flex-col items-center justify-center px-4 text-center overflow-hidden">
          {/* Animated Background Circles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl"
            style={{ transform: "translate(-20%, -20%)" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5,
            }}
            className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl"
            style={{ transform: "translate(20%, 20%)" }}
          />
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative text-5xl md:text-7xl font-extrabold text-white z-10"
          >
            Find Your Dream Job
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mt-4 text-xl md:text-2xl text-white max-w-2xl z-10"
          >
            Empowering students to connect with top employers and launch their
            careers.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/auth/signup"
            className="relative mt-8 inline-block px-8 py-4 bg-white text-[#5772FD] font-bold rounded-full shadow-lg hover:shadow-xl transition z-10"
          >
            Get Started
          </motion.a>
        </section>

        {/* ===== FEATURES SECTION ===== */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center text-[#5772FD]"
            >
              Our Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-center text-gray-600 max-w-2xl mx-auto"
            >
              We provide the tools and resources you need to succeed in
              today&apos;s competitive job market.
            </motion.p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg hover:shadow-2xl transition"
              >
                <img
                  src="/feature-verified.svg"
                  alt="Verified Employers"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold text-[#5772FD]">
                  Verified Employers
                </h3>
                <p className="mt-2 text-gray-600">
                  Connect with trusted employers actively seeking student
                  talent.
                </p>
              </motion.div>
              {/* Feature Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg hover:shadow-2xl transition"
              >
                <img
                  src="/feature-matches.svg"
                  alt="Tailored Job Matches"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold text-[#5772FD]">
                  Tailored Job Matches
                </h3>
                <p className="mt-2 text-gray-600">
                  Get matched with job opportunities that fit your skills and
                  career goals.
                </p>
              </motion.div>
              {/* Feature Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg hover:shadow-2xl transition"
              >
                <img
                  src="/feature-career.svg"
                  alt="Career Resources"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-xl font-semibold text-[#5772FD]">
                  Career Resources
                </h3>
                <p className="mt-2 text-gray-600">
                  Access expert advice and resources to jumpstart your career.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== BUILT WITH SECTION ===== */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center text-[#5772FD] mb-4"
            >
              Powered By
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center text-gray-600 max-w-2xl mx-auto"
            >
              Built with modern, industry-standard technologies
            </motion.p>
          </div>

          {/* Scrolling logos container */}
          <div className="relative overflow-hidden py-8 max-w-4xl mx-auto">
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

            <motion.div
              className="flex space-x-16"
              animate={{ x: [0, -1284] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
            >
              {/* First set of logos */}
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.next className="h-10 w-auto text-black opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.neon className="h-12 w-auto text-green-500 opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.prisma className="h-10 w-auto text-[#2D3748] opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.authJs className="h-10 w-auto text-purple-600 opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.shadCn className="h-10 w-auto text-black opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <img
                  src="/openai.svg"
                  alt="OpenAI"
                  className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Second set of logos */}
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.next className="h-10 w-auto text-black opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.neon className="h-12 w-auto text-green-500 opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.prisma className="h-10 w-auto text-[#2D3748] opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.authJs className="h-10 w-auto text-purple-600 opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.shadCn className="h-10 w-auto text-black opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <img
                  src="/openai.svg"
                  alt="OpenAI"
                  className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Third set of logos */}
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.next className="h-10 w-auto text-black opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.neon className="h-12 w-auto text-green-500 opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.prisma className="h-10 w-auto text-[#2D3748] opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.authJs className="h-10 w-auto text-purple-600 opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <Icons.shadCn className="h-10 w-auto text-black opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center min-w-[150px]">
                <img
                  src="/openai.svg"
                  alt="OpenAI"
                  className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== HOW IT WORKS SECTION ===== */}
        <section className="py-20 bg-[#F0F4FF]">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center text-[#5772FD]"
            >
              How It Works
            </motion.h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Step-by-step process */}
              <div className="space-y-12">
                {/* Step 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col md:flex-row items-center"
                >
                  <img
                    src="/step1.svg"
                    alt="Sign Up"
                    className="w-24 h-24 md:mr-6 mb-4 md:mb-0"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-[#5772FD]">
                      Sign Up
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Create your profile with your details and resume to get
                      started.
                    </p>
                  </div>
                </motion.div>
                {/* Step 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col md:flex-row items-center"
                >
                  <img
                    src="/step2.svg"
                    alt="Build Your Profile"
                    className="w-24 h-24 md:mr-6 mb-4 md:mb-0"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-[#5772FD]">
                      Build Your Profile
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Showcase your skills, experiences, and portfolio to stand
                      out.
                    </p>
                  </div>
                </motion.div>
                {/* Step 3 */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col md:flex-row items-center"
                >
                  <img
                    src="/step3.svg"
                    alt="Connect with Employers"
                    className="w-24 h-24 md:mr-6 mb-4 md:mb-0"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-[#5772FD]">
                      Connect with Employers
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Browse job listings and reach out directly to employers.
                    </p>
                  </div>
                </motion.div>
                {/* Step 4 */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col md:flex-row items-center"
                >
                  <img
                    src="/step4.svg"
                    alt="Land Your Job"
                    className="w-24 h-24 md:mr-6 mb-4 md:mb-0"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-[#5772FD]">
                      Land Your Job
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Secure your position and kickstart your professional
                      journey.
                    </p>
                  </div>
                </motion.div>
                {/* Step 5 */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-col md:flex-row items-center"
                >
                  <img
                    src="/step5.svg"
                    alt="Grow Your Network"
                    className="w-24 h-24 md:mr-6 mb-4 md:mb-0"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-[#5772FD]">
                      Grow Your Network
                    </h3>
                    <p className="mt-2 text-gray-700">
                      Engage with industry professionals and expand your
                      connections.
                    </p>
                  </div>
                </motion.div>
              </div>
              {/* Right Column: Meaningful Animated Network Diagram */}
              <div className="flex flex-col items-center justify-center">
                <motion.svg
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  viewBox="0 0 300 300"
                  className="w-72 h-72"
                >
                  {/* Center Node */}
                  <motion.circle
                    cx="150"
                    cy="150"
                    r="20"
                    fill="#5772FD"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Top Left Node */}
                  <motion.circle
                    cx="70"
                    cy="70"
                    r="12"
                    fill="#5772FD"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                  />
                  {/* Top Right Node */}
                  <motion.circle
                    cx="230"
                    cy="70"
                    r="12"
                    fill="#5772FD"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                  />
                  {/* Bottom Left Node */}
                  <motion.circle
                    cx="70"
                    cy="230"
                    r="12"
                    fill="#5772FD"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                  />
                  {/* Bottom Right Node */}
                  <motion.circle
                    cx="230"
                    cy="230"
                    r="12"
                    fill="#5772FD"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8,
                    }}
                  />
                  {/* Connecting Lines */}
                  <motion.line
                    x1="150"
                    y1="150"
                    x2="70"
                    y2="70"
                    stroke="#5772FD"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  <motion.line
                    x1="150"
                    y1="150"
                    x2="230"
                    y2="70"
                    stroke="#5772FD"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.line
                    x1="150"
                    y1="150"
                    x2="70"
                    y2="230"
                    stroke="#5772FD"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  <motion.line
                    x1="150"
                    y1="150"
                    x2="230"
                    y2="230"
                    stroke="#5772FD"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </motion.svg>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="mt-4 text-lg text-[#5772FD] font-semibold text-center"
                >
                  Seamlessly connecting you to opportunities.
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS SECTION ===== */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-center text-[#5772FD]"
            >
              What Our Users Say
            </motion.h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 shadow-lg rounded-lg hover:shadow-2xl transition"
              >
                <p className="text-gray-600 italic">
                  &quot;This platform helped me land an amazing internship. The
                  job matches were spot on!&quot;
                </p>
                <p className="mt-4 font-semibold text-[#5772FD]">
                  - Alex, Student
                </p>
              </motion.div>
              {/* Testimonial Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-6 shadow-lg rounded-lg hover:shadow-2xl transition"
              >
                <p className="text-gray-600 italic">
                  &quot;We found several talented students through this
                  platform. Highly recommended!&quot;
                </p>
                <p className="mt-4 font-semibold text-[#5772FD]">
                  - Jamie, Employer
                </p>
              </motion.div>
              {/* Testimonial Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-6 shadow-lg rounded-lg hover:shadow-2xl transition"
              >
                <p className="text-gray-600 italic">
                  &quot;A game-changer for students and employers alike. It
                  truly bridges the gap.&quot;
                </p>
                <p className="mt-4 font-semibold text-[#5772FD]">
                  - Morgan, Student
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CALL TO ACTION SECTION ===== */}
        <section className="py-20 bg-[#5772FD] flex flex-col items-center text-center px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-white"
          >
            Ready to take the next step?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg text-white max-w-2xl"
          >
            Join our community today and connect with top employers to jumpstart
            your career.
          </motion.p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/auth/signup"
            className="mt-8 inline-block px-8 py-4 bg-white text-[#5772FD] font-bold rounded-full shadow-lg hover:shadow-xl transition"
          >
            Get Started
          </motion.a>
        </section>
      </main>
    </>
  );
}
