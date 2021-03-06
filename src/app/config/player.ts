import {PlayerOptions} from 'video.js'

export const _PLAYER_OPTIONS_: PlayerOptions = {
  controls: true,
  techOrder: ['html5', 'vimeo', 'youtube'],
  preload: 'metadata'
}

export const _PLAYER_TIMEUPDATE_DEBOUNCE_ = 60
export const _PLAYER_RESIZE_DEBOUNCE_ = 60

export const _PLAYER_ASPECT_RATIO_ = 16/9
