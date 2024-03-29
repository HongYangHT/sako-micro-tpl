import { omit } from 'lodash/omit'
const defaultOpts = {
  // required opts
  Vue: null,
  appOptions: null,
  template: null
}

let el = null
function createDomElement(domEl) {
  // Make sure there is a div for us to render into
  el = document.getElementById(domEl)

  if (!el) {
    el = document.createElement('div')
    el.id = domEl
    // el.classList.add(`${PackageJson.name}`)
    document.body.appendChild(el)
  }
  return el
}

export default function singleSpaVue(userOpts) {
  if (typeof userOpts !== 'object') {
    throw new Error('single-spa-vue requires a configuration object')
  }

  const opts = {
    ...defaultOpts,
    ...userOpts
  }

  if (!opts.Vue) {
    throw new Error('single-spa-vuejs must be passed opts.Vue')
  }

  if (!opts.appOptions) {
    throw new Error('single-spa-vuejs must be passed opts.appOptions')
  }

  // Just a shared object to store the mounted object state
  let mountedInstances = {}

  return {
    bootstrap: bootstrap.bind(null, opts, mountedInstances),
    mount: mount.bind(null, opts, mountedInstances),
    unmount: unmount.bind(null, opts, mountedInstances),
    update: update.bind(null, opts, mountedInstances)
  }
}

function bootstrap(opts) {
  if (opts.loadRootComponent) {
    return opts.loadRootComponent().then(root => (opts.rootComponent = root))
  } else {
    return Promise.resolve()
  }
}

function mount(opts, mountedInstances, props) {
  return Promise.resolve().then(() => {
    const otherOptions = {}
    if (props.domElement && !opts.appOptions.el) {
      otherOptions.el = props.domElement
    }

    if (!otherOptions.el) {
      const htmlId = `single-spa-application:${props.name}`
      otherOptions.el = `#${htmlId.replace(':', '\\:')}`
      let domEl = document.getElementById(htmlId)
      if (!domEl) {
        domEl = document.createElement('div')
        domEl.id = htmlId
        document.body.appendChild(domEl)
      }
    }

    if (!opts.appOptions.render && !opts.appOptions.template && opts.rootComponent) {
      otherOptions.render = h => h(opts.rootComponent)
    }

    const options = {
      ...opts.appOptions,
      ...otherOptions,
      data: {
        ...(opts.appOptions.data || {}),
        ...props
      }
    }

    let { el = '#app' } = options
    let op = omit(options, ['el'])
    let element = document.getElementById(el.replace(/#/, ''))
    !element && createDomElement(el.replace(/#/, ''))
    mountedInstances.instance = new opts.Vue(op)
    mountedInstances.instance.$mount()
    element.appendChild(mountedInstances.instance.$el)
    if (mountedInstances.instance.bind) {
      mountedInstances.instance = mountedInstances.instance.bind(mountedInstances.instance)
    }
  })
}

function update(opts, mountedInstances, props) {
  return new Promise(resolve => {
    const data = {
      ...(opts.appOptions.data || {}),
      ...props
    }
    for (let prop in data) {
      mountedInstances.instance[prop] = data[prop]
    }
    resolve()
  })
}

function unmount(opts, mountedInstances) {
  return Promise.resolve().then(() => {
    mountedInstances.instance.$el.innerHTML = ''
    // document.body.removeChild(mountedInstances.instance.$el)
    mountedInstances.instance.$destroy()
    delete mountedInstances.instance
    mountedInstances.instance = null
  })
}
