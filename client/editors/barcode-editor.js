import { LitElement, html, css } from 'lit-element'

import '@material/mwc-icon'

import { openPopup } from '@things-factory/layout-base'
import './id-selector'

export class IdEditor extends LitElement {
  static get properties() {
    return {
      value: Object,
      column: Object,
      record: Object,
      row: Number
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-flow: row nowrap;

        padding: 7px 0px;
        box-sizing: border-box;

        width: 100%;
        height: 100%;

        border: 0;
        background-color: transparent;

        font: var(--grist-object-editor-font);
        color: var(--grist-object-editor-color);
      }

      span {
        display: block;
        flex: auto;

        height: 100%;

        text-align: inherit;
      }

      mwc-icon {
        width: 20px;
        font-size: 1.5em;
        vertical-align: middle;
      }
    `
  }

  render() {
    var { nameField = 'name', descriptionField = 'description' } = this.column.record.options || {}
    var value = this.value

    return html`
      ${!value
        ? html``
        : html`
            <span>${value[nameField]} (${value[descriptionField]})</span>
          `}
      <mwc-icon>arrow_drop_down</mwc-icon>
    `
  }

  firstUpdated() {
    this.value = this.record[this.column.name]
    this.template = ((this.column.record || {}).options || {}).template

    this.addEventListener('click', e => {
      e.stopPropagation()

      this.openSelector()
    })
  }

  get icon() {
    return this.shadowRoot.querySelector('mwc-icon')
  }

  select() {}

  focus() {
    this.icon.focus()
  }

  openSelector() {
    if (this.popup) {
      delete this.popup
    }

    const confirmCallback = selected => {
      this.dispatchEvent(
        new CustomEvent('field-change', {
          bubbles: true,
          composed: true,
          detail: {
            before: this.value,
            after: selected,
            record: this.record,
            column: this.column,
            row: this.row
          }
        })
      )
    }

    var value = this.value || {}
    var template =
      this.template ||
      html`
        <id-selector
          .value=${value.id}
          style="width: 550px;height: 400px;"
          .confirmCallback=${confirmCallback.bind(this)}
          .queryName=${this.column.record.options.queryName}
          .basicArgs=${this.column.record.options.basicArgs}
        ></id-selector>
      `

    this.popup = openPopup(template, {
      backdrop: true
    })
  }
}

customElements.define('id-editor', IdEditor)
