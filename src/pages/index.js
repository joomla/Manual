import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from "@docusaurus/useBaseUrl"; // gives link after concating website url and path
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';
const quickaccess = [
  {
    title: <>Get started</>,
    href: "/docs",
    imageUrl: "img/updated.svg", // path to image with respect to staic dir
    description: (
      <>
        There are several ways of setting up your workstation in for Joomla! development. Some suggestions can be found at Setting up your workstation for Joomla development.
      </>
    ),
  },
  {
    title: <>Components</>,
    href: "/docs",
    imageUrl: "img/fast.svg", // path to image with respect to staic dir
    description: (
      <>There are many articles, tutorials, references and FAQs which focus on component development. If this is your first time developing a component for Joomla, you should start with the Absolute Basics of How a Component Functions. If needed, you can visualise the control flow of a component with these diagrams.</>
    ),
  },
  {
    title: <>Plugins</>,
    href: "/docs",
    imageUrl: "img/automated.svg", // path to image with respect to staic dir
    description: (
      <>
        The following articles will help familiarise you with Joomla! plugins. They are a good starting point to understanding and then developing plugins.
      </>
    ),
  },
];
// Feature component
function Quickaccess({ imageUrl, title, href, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  const to = useBaseUrl(href);
  return (
    <div className={clsx("col col--4", styles.quickaccess)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.quickaccessImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h2><Link to={to}>{title}</Link></h2>
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
          <a className="button button--secondary" href="/docs/Joomla">Get Started</a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
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
