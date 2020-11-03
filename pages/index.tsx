import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { NotOver, Over } from '../model/IsItFinallyOver'
import styles from '../styles/Home.module.css'
import {over} from './api/over'
import useIsItFinallyOver from '../data/useIsItFinallyOver'

export interface Props {
  initialOver: Over | NotOver | null
}

export default function Home(props: Props) {
  const { result, error } = useIsItFinallyOver({
    refreshInterval: 1000
  })

  const renderSources = (sources: [string, string][]) => {
    return (
      <Fragment>
        <h2 className={styles.sectionTitle}>Sources</h2>
             <div className={styles.grid}>
              {
                sources.map((source) => {
                  return <div className={styles.card}>
                    <h3><a href={source[1]}>{source[0]}</a></h3>
                    <a href={source[1]}>{source[1]}</a>
                  </div>
                })
              }
        </div>
      </Fragment>
    )
  }

  const renderResult = (result: Over | NotOver | void, error: Error | void) => {
    if (error) {
      return <h1 className={styles.title}>
              something happened, please refresh the page
            </h1>
    }

    if (result) {
      switch (result.over) {
        case true:
          return <Fragment>
            <h1 className={styles.title}>Yes</h1>
            {
              result.sources.length > 0 
                ? renderSources(result.sources)
                : null
            }
            
          </Fragment>
        
        case false:
          return <Fragment>
            <h1 className={styles.title}>No</h1>
            <h2 className={styles.sectionTitle}><a href="https://www.vote.org/polling-place-locator/">Please go vote.</a></h2>
            <a href="https://www.vote.org/polling-place-locator/">vote.org</a>
        </Fragment>
      }
    } else {
      return <h1 className={styles.title}>asking, please wait...</h1>
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Is This Finally Over?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          { renderResult(result || props.initialOver, error) }
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const initialOver = over()
  return { props: { initialOver } }
}