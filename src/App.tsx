import { MotionConfig } from 'motion/react'
import Showcase from './Showcase'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Showcase />
    </MotionConfig>
  )
}
