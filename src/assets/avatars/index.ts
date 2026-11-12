import boyDark from './boy-dark.webp'
import boyLight from './boy-light.webp'
import boyMedium from './boy-medium.webp'
import boyMediumDark from './boy-medium-dark.webp'
import boyMediumLight from './boy-medium-light.webp'
import girlDark from './girl-dark.webp'
import girlLight from './girl-light.webp'
import girlMedium from './girl-medium.webp'
import girlMediumDark from './girl-medium-dark.webp'
import girlMediumLight from './girl-medium-light.webp'

export interface AvatarOption {
  id: string
  label: string
  src: string
}

/** Kid avatars a family can choose from. Hair color comes with the skin tone in the source art. */
export const avatarOptions: AvatarOption[] = [
  { id: 'boy-light', label: 'Boy, light skin, black hair', src: boyLight },
  { id: 'boy-medium-light', label: 'Boy, light-medium skin, blond hair', src: boyMediumLight },
  { id: 'boy-medium', label: 'Boy, medium skin, brown hair', src: boyMedium },
  { id: 'boy-medium-dark', label: 'Boy, medium-dark skin, dark brown hair', src: boyMediumDark },
  { id: 'boy-dark', label: 'Boy, dark skin, black hair', src: boyDark },
  { id: 'girl-light', label: 'Girl, light skin, black hair', src: girlLight },
  { id: 'girl-medium-light', label: 'Girl, light-medium skin, blond hair', src: girlMediumLight },
  { id: 'girl-medium', label: 'Girl, medium skin, brown hair', src: girlMedium },
  { id: 'girl-medium-dark', label: 'Girl, medium-dark skin, dark brown hair', src: girlMediumDark },
  { id: 'girl-dark', label: 'Girl, dark skin, black hair', src: girlDark },
]
