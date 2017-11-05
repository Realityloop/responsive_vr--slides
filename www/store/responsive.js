import AFRAME from 'aframe'

export const state = () => ({
  breakpoint: false,
  vr: {
    active: false,
    desktop: false,
    mobile: false
  },
  changed: new Date()
})

export const mutations = {
  breakpointSet (state, { $mq, $mv }) {
    let orig = state.breakpoint

    switch (true) {
      case $mq.below($mv.sm):
        state.breakpoint = 'xs'
        break

      case $mq.below($mv.md):
        state.breakpoint = 'sm'
        break

      case $mq.below($mv.lg):
        state.breakpoint = 'md'
        break

      case $mq.below($mv.xl):
        state.breakpoint = 'lg'
        break

      default:
        state.breakpoint = 'xl'
    }

    if (orig !== state.breakpoint) {
      state.changed = new Date()
    }
  },

  vrSet (state, value) {
    let orig = state.active

    state.vr.active = value
    state.vr.desktop = value && !AFRAME.utils.device.isMobile()
    state.vr.mobile = value && AFRAME.utils.device.isMobile()

    if (orig !== state.active) {
      state.changed = new Date()
    }
  }
}
