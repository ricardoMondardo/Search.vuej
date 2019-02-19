/**
 *
 */
class KeySiteCore {
  /**
   * before mount root element catch the key of root element
   */
  beforeMount() {
    if (this.$el !== undefined) {
      this.domObj = {}
      const domObj = this.$el.getElementsByTagName('*')
      let key = this.$el.getAttribute('key')
      /* istanbul ignore next */
      if (this.$el.id !== '' && key != null) {
        this.domObj[this.$el.id] = key
      }
      const max = domObj.length
      for (let i = 0; i < max; i += 1) {
        const elem = domObj[i]
        key = elem.getAttribute('key')
        /* istanbul ignore next */
        if (elem.id !== '' && key != null) {
          if (this.domObj[elem.id] === undefined) {
            this.domObj[elem.id] = key
          } else {
            /* istanbul ignore next */
            throw new RangeError(`The  id  ${elem.id} is already set`)
          }
        }
      }
    }
  }

  /**
   * when mounted components get the vnode key value
   * update the key attribute using the scKey attribute
   */
  mounted() {
    /* istanbul ignore next */
    if (this.domObj) {
      let key = this.domObj[this.$el.id]
      if (key) this.$el.setAttribute('key', key)
      const domObj = this.$el.getElementsByTagName('*')
      const max = domObj.length
      for (let i = 0; i < max; i += 1) {
        const elem = domObj[i]
        key = this.domObj[elem.id]
        if (key) elem.setAttribute('key', key)
      }
      this.domObj = {}
    }
  }

  /**
   * Install the global plugin for handle key issue on sitecore editor
   * @param Vue
   */
  static install(Vue) {
    this.instance = new KeySiteCore(Vue)
    Vue.mixin({
      beforeMount: this.instance.beforeMount,
      mounted: this.instance.mounted,
    })
  }
}

export default {
  install: Vue => KeySiteCore.install(Vue),
}
