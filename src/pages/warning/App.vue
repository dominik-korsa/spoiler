<template>
  <div id="app" :style="`--screen-height: ${windowHeight}px`">
    <h1 class="title">Spoiler warning!</h1>
    <div class="url">
      <div class="url__label">Target URL</div>
      <div class="url__value" v-text="url" />
      <a :href="url" class="url__button">Open</a>
    </div>
  </div>
</template>

<script>
import queryString from 'querystring';

export default {
  data: () => ({
    url: null,
    windowHeight: window.innerHeight,
  }),
  created() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
    const query = queryString.parse(window.location.search.substring(1));
    if (!query.url) {
      window.location = './';
      return;
    }
    this.url = query.url;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter&family=Kumbh+Sans&display=swap');

  body {
    margin: 0;
    background-color: #111;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    color: white;
  }

  #app {
    min-height: var(--screen-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title {
    color: #CC2851;
    font-weight: 400;
    font-size: 48pt;
    text-align: center;
    padding: 0 16px;
    font-family: 'Kumbh Sans', sans-serif;
  }

  .url {
    min-width: 400px;
    width: fit-content;
    margin: 16px 64px;
    box-sizing: border-box;
    max-width: 900px;
    border: 1px solid #fff8;
    border-radius: 4px;
    padding: 8px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "label button"
      "value button";
    overflow-x: hidden;

    &__label {
      color: #fffa;
      font-size: 10pt;
      text-transform: uppercase;
      grid-area: label;
    }

    &__value {
      grid-area: value;
      font-size: 12pt;
      line-break: anywhere;
    }

    &__button {
      background-color: #CC2851;
      color: white;
      text-decoration: none;
      font-size: 12pt;
      padding: 8px 16px;
      border-radius: 4px;
      display: block;
      text-transform: uppercase;
      grid-area: button;
      align-self: center;
      margin-left: 8px;
    }
  }

  @media screen and (max-width: 750px) {
    .title {
      font-size: 32pt;
    }
  }

  @media screen and (max-width: 500px) {
    .title {
      font-size: 24pt;
    }

    .url {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        "label"
        "value"
        "button";
      min-width: initial;
      width: auto;
      align-self: stretch;
      margin: 16px 12px;

      &__value {
        font-size: 10pt;
      }

      &__button {
        margin-left: auto;
        margin-top: 8px;
        padding: 6px 12px;
        font-size: 10pt;
      }
    }
  }
</style>
