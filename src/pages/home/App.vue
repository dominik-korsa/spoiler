<template>
  <div id="app">
    <div class="logo">
      <span>
        Spoiler warning
      </span>
      creator
    </div>
    <form class="form" @submit.prevent="copy" autocomplete="off">
      <label for="url-input" class="url__label">Target URL</label>
      <input type="url" class="url__input" id="url-input" placeholder="https://example.com/" v-model="url" />
      <div class="buttons">
        <button
          class="copy-button"
          :class="{
            'copy-button--copied': copied,
          }"
          :disabled="!valid"
          type="submit"
        >
          <span class="copy-button__text" :aria-hidden="copied">Copy link</span>
          <span class="copy-button__copied" :aria-hidden="!copied">Copied!</span>
        </button>
        <a
          class="preview-button"
          :href="warningUrl"
          :class="{
            'preview-button--disabled': !valid
          }"
        >
          Show this warning
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import queryString from 'querystring';

export default {
  data: () => ({
    url: '',
    copied: false,
  }),
  computed: {
    valid() {
      return this.url.trim() !== '';
    },
    warningUrl() {
      if (!this.valid) return null;
      const query = {
        url: this.url.trim(),
      };
      return new URL(`warning.html?${queryString.stringify(query)}`, window.location).toString();
    },
  },
  methods: {
    copy() {
      if (!this.valid || this.copied) return;
      this.$clipboard(this.warningUrl);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    },
  },
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter&family=Kumbh+Sans:wght@300;400&display=swap');

  body {
    margin: 0;
    background-color: #111;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    color: white;
  }

  .logo {
    margin: 48px 16px;
    font-size: 20pt;
    font-weight: 300;
    font-family: 'Kumbh Sans', sans-serif;
    text-align: center;

    span {
      font-weight: 400;
      color: #CC2851;
    }
  }

  .form {
    padding: 8px 16px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    display: block;

    .url__label {
      color: #fffa;
      font-size: 10pt;
      text-transform: uppercase;
      display: block;
    }

    .url__input {
      font-size: 12pt;
      line-break: anywhere;
      display: block;
      border: 1px solid #fff8;
      color: white;
      border-radius: 4px;
      padding: 8px;
      width: 100%;
      box-sizing: border-box;
      background-color: transparent;
      margin-top: 8px;
      transition: background-color 100ms, border 100ms;

      &:focus {
        outline: none;
        border-color: white;
        background-color: #fff2;
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 24px;

    .copy-button {
      text-decoration: none;
      font-size: 12pt;
      padding: 8px 16px;
      border-radius: 4px;
      display: grid;
      text-transform: uppercase;
      transition: background-color 200ms, color 200ms, border 200ms;
      cursor: pointer;
      background-color: #CC2851;
      color: white;
      border: none;
      margin-left: 8px;
      line-height: 16pt;

      &:disabled {
        background-color: #444;
        color: #bbb;
        cursor: default;
      }

      &:not(:disabled):not(.copy-button--copied):hover {
        background-color: #DB4369;
      }

      &__text {
        line-height: inherit;
        grid-column: 1;
        grid-row: 1;
        opacity: 1;
      }

      &__copied {
        line-height: inherit;
        grid-column: 1;
        grid-row: 1;
        opacity: 0;
      }

      &--copied {
        cursor: default;

        .copy-button__text {
          opacity: 0;
        }

        .copy-button__copied {
          opacity: 1;
        }
      }
    }

    .preview-button {
      text-decoration: none;
      font-size: 12pt;
      padding: 7px 15px;
      border-radius: 4px;
      display: block;
      text-transform: uppercase;
      transition: background-color 200ms, color 200ms;
      color: white;
      border: 1px solid white;
      background-color: transparent;
      line-height: 16pt;

      &--disabled {
        color: #666;
        border-color: #444;
        cursor: default;
      }

      &:not(.preview-button--disabled):hover {
        background-color: #fff2;
      }
    }
  }
</style>
