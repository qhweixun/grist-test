import { html, css } from 'lit-element'

import { PageView, store } from '@things-factory/shell'
import { localize, i18next } from '@things-factory/i18n-base'

import '@things-factory/grist-ui'

class ListTest extends localize(i18next)(PageView) {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: rows;
      }

      data-list {
        flex: 1;
      }
    `
  }

  static get properties() {
    return {
      config: Object,
      data: Object
    }
  }

  render() {
    return html`
      <data-list .config=${this.config} .data=${this.data}></data-list>
    `
  }

  activated(active) {
    if (!active) {
      return
    }

    this.config = {
      columns: [
        {
          type: 'gutter',
          gutterName: 'sequence'
        },
        {
          type: 'gutter',
          gutterName: 'row-selector'
        },
        {
          type: 'gutter',
          gutterName: 'button',
          icon: 'edit'
        },
        {
          type: 'string',
          name: 'id',
          hidden: true
        },
        {
          type: 'string',
          name: 'name',
          header: i18next.t('field.name'),
          record: {
            align: 'center'
          },
          sortable: true,
          width: 120
        },
        {
          type: 'string',
          name: 'description',
          header: i18next.t('field.description'),
          record: {
            align: 'left'
          },
          width: 200
        },
        {
          type: 'string',
          name: 'email',
          header: i18next.t('field.email'),
          record: {
            align: 'left'
          },
          sortable: true,
          width: 130
        }
      ],
      sorters: [
        {
          name: 'name',
          descending: true
        },
        {
          name: 'email'
        }
      ],
      pagination: {
        pages: [20, 30, 50, 100, 200],
        page: 30,
        limit: 100
      }
    }

    this.data = {
      total: 12098,
      page: 119,
      records: Array(200)
        .fill()
        .map((item, idx) => {
          return {
            id: idx,
            name: idx % 2 ? 'shnam' : 'heartyoh',
            description: idx % 2 ? 'hatiolab manager' : 'hatiosea manager',
            email: idx % 2 ? 'shnam@gmail.com' : 'heartyoh@gmail.com'
          }
        })
    }
  }
}

window.customElements.define('list-test', ListTest)
