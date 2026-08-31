import React from 'react'
import { Link } from 'react-router'
import '../style/landing.scss'
import { useAuth } from '../../auth/hooks/useAuth'

const Landing = () => {
    const { user } = useAuth()

    return (
        <div className='landing-page'>

            {/* ── Navigation Bar ── */}
            <header className='landing-nav'>
                <div className='container landing-nav__inner'>
                    <Link to='/' className='landing-nav__brand'>
                        Interview <span className='highlight'>AI</span>
                    </Link>

                    <ul className='landing-nav__links'>
                        <li><a href='#about'>About</a></li>
                        <li><a href='#features'>Features</a></li>
                        <li><a href='#how-it-works'>How It Works</a></li>
                    </ul>

                    <div className='landing-nav__actions'>
                        {user ? (
                            <Link to='/dashboard' className='landing-nav__cta-btn'>
                                Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link to='/login' className='landing-nav__login-btn'>
                                    Sign In
                                </Link>
                                <Link to='/register' className='landing-nav__cta-btn'>
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* ── Hero Section ── */}
            <section className='hero container'>
                <div className='hero__badge'>
                    <span>✦</span> AI-Powered Interview Preparation
                </div>

                <h1 className='hero__title'>
                    Crack Your Next Tech Interview with <span className='highlight'>Precision AI Strategy</span>
                </h1>

                <p className='hero__subtitle'>
                    Transform any target job description and your resume into a personalized interview battle-plan — complete with predicted technical questions, behavioral frameworks, skill gap diagnosis, and ATS-tailored resumes.
                </p>

                <div className='hero__ctas'>
                    {user ? (
                        <Link to='/dashboard' className='hero__btn-primary'>
                            Go to Dashboard
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>
                    ) : (
                        <>
                            <Link to='/register' className='hero__btn-primary'>
                                Start Preparing Free
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </Link>
                            <Link to='/login' className='hero__btn-secondary'>
                                Sign In
                            </Link>
                        </>
                    )}
                </div>

                <div className='hero__chips'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Role-Specific Questions
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        7-Day Prep Roadmap
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ATS Resume Generator
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Skill Gap Analysis
                    </span>
                </div>
            </section>

            {/* ── About Section ── */}
            <section id='about' className='about-section'>
                <div className='container'>
                    <div className='section-header'>
                        <span className='section-header__tag'>Why Interview AI</span>
                        <h2 className='section-header__title'>Engineered for Serious Job Seekers</h2>
                        <p className='section-header__subtitle'>
                            Generic interview practice isn't enough. Our platform analyzes your actual resume against the specific job description you're targeting.
                        </p>
                    </div>

                    <div className='about-section__grid'>
                        <div className='about-section__card'>
                            <div className='card-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <h3>Deep Profile & Job Matching</h3>
                            <p>
                                Upload your PDF resume or write a self-description alongside the target job requirements. Our AI compares competencies, tech stacks, and domain depth.
                            </p>
                        </div>

                        <div className='about-section__card'>
                            <div className='card-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="12 6 12 12 16 14"></polygon></svg>
                            </div>
                            <h3>Actionable 7-Day Roadmap</h3>
                            <p>
                                Receive a day-by-day customized study schedule with focused topics and actionable tasks designed to get you ready for interview rounds efficiently.
                            </p>
                        </div>

                        <div className='about-section__card'>
                            <div className='card-icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <h3>ATS Resume Generation</h3>
                            <p>
                                Automatically export an ATS-optimized, professionally formatted resume in PDF format tailored specifically to the target role's keywords and skills.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Features Section ── */}
            <section id='features' className='features-section'>
                <div className='container'>
                    <div className='section-header'>
                        <span className='section-header__tag'>Platform Capabilities</span>
                        <h2 className='section-header__title'>Everything You Need to Ace the Interview</h2>
                        <p className='section-header__subtitle'>
                            A comprehensive toolkit designed to boost your confidence and maximize your interview performance.
                        </p>
                    </div>

                    <div className='features-section__grid'>
                        <div className='features-section__item'>
                            <div className='item-header'>
                                <span className='item-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                </span>
                                <h3>Technical Interview Questions</h3>
                            </div>
                            <p>
                                Exact technical questions predicted for the role, paired with interviewer intentions and comprehensive model answers to guide your explanations.
                            </p>
                        </div>

                        <div className='features-section__item'>
                            <div className='item-header'>
                                <span className='item-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                </span>
                                <h3>Behavioral & STAR Questions</h3>
                            </div>
                            <p>
                                Situational and soft-skill questions structured around the STAR method (Situation, Task, Action, Result) for articulate storytelling.
                            </p>
                        </div>

                        <div className='features-section__item'>
                            <div className='item-header'>
                                <span className='item-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                </span>
                                <h3>Skill Gap Identification</h3>
                            </div>
                            <p>
                                Critical identification of missing competencies and knowledge gaps, categorized by severity (High, Medium, Low) so you know what to revise first.
                            </p>
                        </div>

                        <div className='features-section__item'>
                            <div className='item-header'>
                                <span className='item-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                                </span>
                                <h3>7-Day Structured Roadmap</h3>
                            </div>
                            <p>
                                Step-by-step daily study plans breaking down large preparation topics into achievable, actionable milestones over a 7-day preparation sprint.
                            </p>
                        </div>

                        <div className='features-section__item'>
                            <div className='item-header'>
                                <span className='item-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                                </span>
                                <h3>Match Score Analytics</h3>
                            </div>
                            <p>
                                An objective compatibility score (0-100%) indicating how closely your current background aligns with the target role requirements.
                            </p>
                        </div>

                        <div className='features-section__item'>
                            <div className='item-header'>
                                <span className='item-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                </span>
                                <h3>Tailored PDF Resume Export</h3>
                            </div>
                            <p>
                                One-click generation and download of an ATS-optimized, professionally structured PDF resume crafted specifically for the position.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── How It Works Section ── */}
            <section id='how-it-works' className='how-it-works'>
                <div className='container'>
                    <div className='section-header'>
                        <span className='section-header__tag'>Simple 4-Step Process</span>
                        <h2 className='section-header__title'>How It Works</h2>
                        <p className='section-header__subtitle'>
                            From job description to complete interview readiness in under a minute.
                        </p>
                    </div>

                    <div className='how-it-works__steps'>
                        <div className='how-it-works__step'>
                            <span className='step-number'>1</span>
                            <h3>Input Role & Profile</h3>
                            <p>Paste the job description and upload your resume PDF (or enter a self-description).</p>
                        </div>

                        <div className='how-it-works__step'>
                            <span className='step-number'>2</span>
                            <h3>AI Analysis</h3>
                            <p>Google Gemini AI cross-examines your background against required technical skills.</p>
                        </div>

                        <div className='how-it-works__step'>
                            <span className='step-number'>3</span>
                            <h3>Generate Strategy</h3>
                            <p>Receive your personalized dashboard with predicted Q&As, skill gaps, and 7-day roadmap.</p>
                        </div>

                        <div className='how-it-works__step'>
                            <span className='step-number'>4</span>
                            <h3>Prep & Export Resume</h3>
                            <p>Study model answers, follow daily tasks, and download a tailored ATS resume PDF.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className='cta-banner'>
                <div className='container'>
                    <div className='cta-banner__box'>
                        <h2>Ready to Accelerate Your Interview Prep?</h2>
                        <p>
                            Get tailored questions, clear answers, and an actionable roadmap designed specifically for your target role.
                        </p>
                        {user ? (
                            <Link to='/dashboard' className='cta-btn'>
                                Open Dashboard →
                            </Link>
                        ) : (
                            <Link to='/register' className='cta-btn'>
                                Get Started Free →
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className='landing-footer'>
                <div className='container landing-footer__inner'>
                    <span className='landing-footer__brand'>
                        Interview <span className='highlight'>AI</span>
                    </span>

                    <span className='landing-footer__copyright'>
                        &copy; {new Date().getFullYear()} Interview AI. All rights reserved.
                    </span>

                    <div className='landing-footer__links'>
                        <Link to='/login'>Sign In</Link>
                        <Link to='/register'>Register</Link>
                        {user && <Link to='/dashboard'>Dashboard</Link>}
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Landing

