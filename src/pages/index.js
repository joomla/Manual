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
    title: <>Iniciação</>,
    href: "/docs/get-started",
    iconName: <IconName.BsPlayCircle className="icon--3x" />,
    description: (
      <>
        Saiba como se preparar para o desenvolvimento do Joomla e como obter ajuda dos seus colegas do Joomla quando fica preso.
      </>
    ),
  },
  {
    title: <>Tutoriais</>,
    href: "/docs/building-extensions/modules/module-development-tutorial/",
    iconName: <IconName.BsBook className="icon--3x" />,
    description: (
      <>
        Aprenda o básico do Joomla através do seguinte "Tutorial do Desenvolvimento do Módulo". 
      </>
    ),
  },
  {
    title: <>Plug-ins</>,
    href: "/docs/building-extensions/plugins/",
    iconName: <IconName.BsPlug className="icon--3x" />,
    description: (
      <>
        Saiba como funcionam os ''plug-ins'' do Joomla. Transfira e instale diferentes ''plug-ins'' de exemplo, todos com explicações detalhadas para o ajudar a saber o que se passa.
      </>
    ),
  },
  {
    title: <>Conceitos</>,
    href: "/docs/general-concepts/",
    iconName: <IconName.BsGear className="icon--3x" />,
    description: (
        <>
          Leia acerca dos Formulários Joomla, Gestor de Ativos da Web, Espaço de nomes e muito mais. Todas as maneiras pelas quais o Joomla facilita para você alcançar os seus objetivos.
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
      title={`Começar com o ${siteConfig.title}`}
      description="Joomla Abrangente! Manual do programador com documentação completa para criar extensões e componentes personalizados.">
      <HomepageHeader />0
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
