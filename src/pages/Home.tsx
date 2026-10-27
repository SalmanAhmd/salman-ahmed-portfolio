import Hero from '../components/Hero'
import Philosophy from '../components/Philosophy'
import CaseStudy from '../components/CaseStudy'
import Work from '../components/Work'
import Journey from '../components/Journey'
import Experience from '../components/Experience'
import GitHubActivity from '../components/GitHubActivity'
import Stack from '../components/Stack'
import Method from '../components/Method'
import Focus from '../components/Focus'
import Notes from '../components/Notes'
import PlayTeaser from '../components/PlayTeaser'
import Contact from '../components/Contact'
import { PROFILE } from '../data/content'
import { useDocumentTitle } from '../hooks'

export default function Home() {
  useDocumentTitle(`${PROFILE.name} — ${PROFILE.role}`)

  return (
    <>
      <Hero />
      <Philosophy />
      <CaseStudy />
      <Work />
      <Journey />
      <Experience />
      <GitHubActivity />
      <Stack />
      <Method />
      <Focus />
      <Notes />
      <PlayTeaser />
      <Contact />
    </>
  )
}
