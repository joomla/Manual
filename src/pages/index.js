import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from "@docusaurus/useBaseUrl"; // gives link after concatenating website url and path
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import * as IconName from 'react-icons/bs';
import * as FaIconName from 'react-icons/fa'; // Bootstrap does not have any accessibility icons.


import styles from './index.module.css';
const quickaccess = [
  {
    title: <>Get started</>,
    href: "/docs/get-started",
    iconName: <IconName.BsPlayCircle className="icon--3x" />,
    description: (
      <>
        Find out how to get set up for Joomla development, and how to get help from your Joomla colleagues when you get stuck.
      </>
    ),
  },
  {
    title: <>Tutorials</>,
    href: "/docs/building-extensions/modules/module-development-tutorial/",
    iconName: <IconName.BsBook className="icon--3x" />,
    description: (
      <>
        Learn the basics of Joomla through following the Module Development Tutorial. 
      </>
    ),
  },
  {
    title: <>Plugins</>,
    href: "/docs/building-extensions/plugins/",
    iconName: <IconName.BsPlug className="icon--3x" />,
    description: (
      <>
        Learn how Joomla plugins work. Download and install the different example plugins, all with detailed explanations to help you understand what's going on.
      </>
    ),
  },
  {
    title: <>Concepts</>,
    href: "/docs/general-concepts/",
    iconName: <IconName.BsGear className="icon--3x" />,
    description: (
        <>
          Read about Joomla Forms, Web Asset Manager, Namespacing and lots more. All the ways that Joomla makes it easy for you to achieve your aims.
        </>
    ),
  },
];
// Feature component
function Quickaccess({ iconName, title, href, description }) {
  return (
    <div className={clsx("col col--3 padding-vert--md", styles.quickaccess)}>
      {iconName && (
        <div className="line-bottom line-bottom--pri margin-bottom--md">
          {iconName}
        </div>
      )}
      <h2><Link to={href}>{title}</Link></h2>
      <p>{description}</p>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={clsx('hero hero--primary margin-bottom--xl', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className="indexCtas">
          <a className="button button--secondary" href="/docs/get-started/">Get Started</a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Get started with the ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        {quickaccess && quickaccess.length > 0 && (
            <section className={clsx('margin-bottom--xl', styles.quickaccess)}>
              <div className="container">
                <div className="row">
                  {quickaccess.map((props, idx) => (
                    <Quickaccess key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}
       </main>
    </Layout>
  );
}
