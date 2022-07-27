import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from "@docusaurus/useBaseUrl"; // gives link after concatenating website url and path
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import * as IconName from 'react-icons/bs';


import styles from './index.module.css';
const quickaccess = [
  {
    title: <>Get started</>,
    href: "/docs/get-started",
    iconName: <IconName.BsPlayCircle className="icon--3x" />,
    description: (
      <>
        There are several ways of setting up your workstation for Joomla! development. Some suggestions can be found at Setting up your workstation for Joomla development.
      </>
    ),
  },
  {
    title: <>Components</>,
    href: "/docs/building-extensions/component",
    iconName: <IconName.BsFillGearFill className="icon--3x" />,
    description: (
      <>There are many articles, tutorials, references and FAQs which focus on component development. If this is your first time developing a component for Joomla, you should start with the Absolute Basics of How a Component Functions. If needed, you can visualise the control flow of a component with these diagrams.</>
    ),
  },
  {
    title: <>Plugins</>,
    href: "/docs/building-extensions/plugins/",
    iconName: <IconName.BsBox className="icon--3x" />,
    description: (
      <>
        The following articles will help familiarise you with Joomla! plugins. They are a good starting point to understanding and then developing plugins.
      </>
    ),
  },
];
// Feature component
function Quickaccess({ iconName, title, href, description }) {
  return (
    <div className={clsx("col col--4", styles.quickaccess)}>
      {iconName && (
        <div className="text--center">
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
