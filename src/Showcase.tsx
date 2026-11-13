import { useState, type ReactNode } from 'react'
import { avatarOptions } from './assets/avatars'
import { Avatar } from './components/Avatar'
import { ClayButton } from './components/ClayButton'
import { ClayCard } from './components/ClayCard'
import { ClayInput } from './components/ClayInput'
import { Modal } from './components/Modal'
import { ProgressBar } from './components/ProgressBar'
import { Tag } from './components/Tag'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      <ClayCard className="flex flex-wrap items-center gap-4">{children}</ClayCard>
    </section>
  )
}

/** Every base component in its variants and states, for visual review at any width. */
export default function Showcase() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 p-4 md:p-10">
      <h1 className="text-3xl font-bold md:text-4xl">Kiddy Bank design system</h1>

      <Section title="ClayButton">
        <ClayButton>Primary</ClayButton>
        <ClayButton variant="coral">Coral</ClayButton>
        <ClayButton variant="light">Light</ClayButton>
        <ClayButton disabled>Disabled</ClayButton>
      </Section>

      <Section title="Tag">
        <Tag tone="lavender">Lavender</Tag>
        <Tag tone="mint">Mint</Tag>
        <Tag tone="peach">Peach</Tag>
        <Tag tone="yellow">Yellow</Tag>
        <Tag tone="sky">Sky</Tag>
      </Section>

      <Section title="Avatar">
        <Avatar name="Theo" src={avatarOptions[1].src} />
        <Avatar name="Nia" src={avatarOptions[6].src} />
        <Avatar name="Sam" />
      </Section>

      <Section title="Avatar options">
        {avatarOptions.map((option) => (
          <Avatar key={option.id} name={option.label} src={option.src} className="size-16" />
        ))}
      </Section>

      <Section title="ProgressBar">
        <div className="flex w-full flex-col gap-4">
          <ProgressBar value={0} max={200} label="Empty" />
          <ProgressBar value={45} max={200} label="Toy Rocket, 45 of 200" />
          <ProgressBar value={200} max={200} label="Full" />
        </div>
      </Section>

      <Section title="ClayInput">
        <div className="grid w-full gap-4 md:grid-cols-3">
          <ClayInput label="Default" placeholder="Type here" />
          <ClayInput label="With error" defaultValue="12" error="Use 4 digits" />
          <ClayInput label="Disabled" disabled defaultValue="Locked" />
        </div>
      </Section>

      <Section title="Modal">
        <ClayButton onClick={() => setModalOpen(true)}>Open modal</ClayButton>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Get the Toy Rocket?">
          <p className="mb-5 text-ink-soft">This costs 200 bucks.</p>
          <div className="flex gap-3">
            <ClayButton onClick={() => setModalOpen(false)}>Yes</ClayButton>
            <ClayButton variant="light" onClick={() => setModalOpen(false)}>Not now</ClayButton>
          </div>
        </Modal>
      </Section>
    </main>
  )
}
