
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { ValueProp } from '@/components/sections/ValueProp'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Approach } from '@/components/sections/Approach'
import { Trust } from '@/components/sections/Trust'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueProp />
      <Services />
      <Projects />
      <Approach />
      <Trust />
      <Contact />
      <Footer />
    </main>
  )
}
