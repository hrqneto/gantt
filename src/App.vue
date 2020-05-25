<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "~@fortawesome/fontawesome-free/css/all.min.css";
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  $gray: #C0C4CC;
  $gray-hover: #909399;
  
  .bar-style .bar {
    fill: #C0C4CC !important;
  }

  .bar-style g rect {
    fill: #b0042b !important;
  }
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: $gray;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: $gray-hover;
  }

  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    animation: fadein 1s;
    -moz-animation: fadein 1s; /* Firefox */
    -webkit-animation: fadein 1s; /* Safari and Chrome */
    -o-animation: fadein 1s; /* Opera */
  }

  @keyframes fadein {
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
  @-moz-keyframes fadein { /* Firefox */
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
  @-webkit-keyframes fadein { /* Safari and Chrome */
    from {
      opacity:0;
    }
    to {
      opacity:1;
    }
  }
  @-o-keyframes fadein { /* Opera */
    from {
      opacity:0;
    }
    to {
      opacity: 1;
    }
  }

.gantt-schedule-timeline-calendar__chart-timeline-items-row-item {
  background: #b0042b !important;
}
</style>
