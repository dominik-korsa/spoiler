<template>
  <div id="app">
    <div class="logo">
      <span>
        Spoiler warning
      </span>
      creator
    </div>
    <div class="form">
      <label for="url-input" class="url__label">Target URL</label>
      <input type="url" class="url__input" id="url-input" placeholder="https://example.com/" v-model="url" />
      <div class="buttons">
        <a class="preview-button" :href="warningUrl" :class="{
          'preview-button--disabled': !valid
        }">
          Preview
        </a>
        <button class="copy-button" :disabled="!valid" @click="copy">
          Copy link
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import queryString from 'querystring';

export default {
  data: () => ({
    url: '',
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
      if (!this.valid) return;
      this.$clipboard(this.warningUrl);
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
      padding: 7px 15px;
      border-radius: 4px;
      display: block;
      text-transform: uppercase;
      color: white;
      border: 1px solid white;
      transition: background-color 200ms, color 200ms, border 200ms;
      background-color: transparent;
      cursor: pointer;

      &:disabled {
        color: #666;
        border-color: #444;
        cursor: default;
      }

      &:not(:disabled):hover {
        background-color: #fff2;
      }
    }

    .preview-button {
      background-color: #CC2851;
      color: white;
      text-decoration: none;
      font-size: 12pt;
      padding: 8px 16px;
      border-radius: 4px;
      display: block;
      text-transform: uppercase;
      transition: background-color 200ms, color 200ms;
      margin-left: 8px;

      &--disabled {
        background-color: #444;
        color: #bbb;
        cursor: default;
      }

      &:not(&--disabled):hover {
        background-color: #DB4369;
      }
    }
  }
</style>
