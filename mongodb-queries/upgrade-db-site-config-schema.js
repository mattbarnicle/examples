function processHeaderMenuItem (item) {
  switch (item.type) {
    case 'site link':
    case 'members link':
      item.type = 'link'

      item.link = {
        type: 'internal',
        internal: {
          type: 'site',
          path: item.path
        }
      }

      delete item.path

      break

    case 'external link':
      item.type = 'link'

      item.link = {
        type: 'external',
        external: {
          url: item.url,
          newWindow: item.newWindow
        }
      }

      delete item.url
      delete item.newWindow

      break

    case 'component':
      item.type = 'component'

      item.component = {
        type: item.component
      }

      break

    case 'dropdown':
    default:
      break
  }
}

db.siteConfig.find({}).forEach(function (siteConfig) {
  for (var i = 0 ; i < siteConfig.headerMenu.length ; i++) {
    var item = siteConfig.headerMenu[i]

    processHeaderMenuItem(item)

    if (item.type === 'dropdown') {
      for (var j = 0 ; j < item.children.length ; j++) {
        var childItem = item.children[j]

        processHeaderMenuItem(childItem)
      }
    }
  }

  db.siteConfig.save(siteConfig)
});

function processMembersSidebarMenuItem (item) {
  if (item.type === 'product' && item.productType === 'videos') {
    item.type = 'members link'
  }

  switch (item.type) {
    case 'site link':
    case 'members link':
      item.type = 'link'

      item.link = {
        type: 'internal',
        internal: {
          type: item.type === 'site link' ? 'site' : 'members',
          path: item.path
        }
      }

      if (item.productType === 'videos') {
        item.link.internal.category = item.category
      }

      delete item.path
      delete item.productType
      delete item.category

      break

    case 'external link':
      item.type = 'link'

      item.link = {
        type: 'external',
        external: {
          url: item.url,
          newWindow: item.newWindow
        }
      }

      delete item.url
      delete item.newWindow

      break

    case 'component':
      item.component = {
        type: item.component
      }

      break

    case 'product':
      item.product = {
        type: item.productType,
        doc: item.doc,
        docModel: item.docModel
      }

      delete item.path
      delete item.productType
      delete item.doc
      delete item.docModel

      break

    case 'dropdown':
    default:
      break
  }

  if (item.iconType === 'fontawesome') {
    item.icon = {
      type: 'fontawesome',
      fontawesome: item.icon
    }
  }
  else {
    item.icon = {
      type: 'custom',
      custom: {
        src: item.customIcon.src,
        width: item.customIcon.style.width,
        height: item.customIcon.style.height
      }
    }

    if (item.customIcon.className) {
      item.icon.custom.className = item.customIcon.className
    }
  }

  delete item.iconType
  delete item.customIcon
}

db.siteConfig.find({}).forEach(function (siteConfig) {
  for (var i = 0 ; i < siteConfig.members.sidebarMenu.length ; i++) {
    var item = siteConfig.members.sidebarMenu[i]

    processMembersSidebarMenuItem(item)

    if (item.type === 'dropdown') {
      for (var j = 0 ; j < item.children.length ; j++) {
        var childItem = item.children[j]

        processMembersSidebarMenuItem(childItem)
      }
    }
  }

  db.siteConfig.save(siteConfig)
});

db.siteConfig.find({}).forEach(function (siteConfig) {
  for (var i = 0 ; i < siteConfig.members.dashboard.panels.length ; i++) {
    var panel = siteConfig.members.dashboard.panels[i]

    panel.blocks = panel

    for (var j = 0 ; j < panel.blocks.length ; j++) {
      var block = panel.blocks[j]

      switch (block.type) {
        case 'module':
          block.type = 'product'
          block.product = block.productBlock
          block.product.type = 'module'
          block.product.doc = block.doc
          block.product.docModel = block.docModel

          delete block.doc
          delete block.docModel
          delete block.subscriptionBlock
          delete block.productBlock

          break

        case 'remote service':
          block.remoteService = block.remoteServiceBlock

          delete block.subscriptionBlock
          delete block.productBlock
          delete block.remoteServiceBlock

          break

        case 'subscription':
          block.subscription = block.subscriptionBlock
          block.subscription.doc = block.doc
          block.subscription.docModel = block.docModel

          switch (block.docModel) {
            case 'videoCourse':
              block.subscription.type = 'video course'

              break

            case 'training':
              block.subscription.type = 'training'

              break
          }

          delete block.doc
          delete block.docModel
          delete block.subscriptionBlock
          delete block.productBlock

          break
      }
    }
  }

  db.siteConfig.save(siteConfig)
});
