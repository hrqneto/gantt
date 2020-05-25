<template>
  <form>
    <div class="group">      
      <input :type="type" required v-model="value" @input="input">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>{{ label }}</label>
    </div>
  </form>
</template>

<script>
export default {
  name: 'generic-input',

  props: {
    type: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
  },

  data () {
    return {
      value: ''
    }
  },

  methods: {
    input() {
      this.$emit('input', this.value);
    }
  }

}
</script>

<style lang="scss" scoped>
  * { box-sizing:border-box; }

  /* basic stylings ------------------------------------------ */
  h2 		 { 
    text-align:center; 
    margin-bottom:50px; 
  }
  h2 small { 
    font-weight:normal; 
    color:#888; 
    display:block; 
  }
  .footer 	{ text-align:center; }
  .footer a  { color:#b0042b; }

  /* form starting stylings ------------------------------- */
  .group 			  { 
    position:relative; 
    margin-bottom:45px; 
  }
  input 				{
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:0.5px solid #DCDFE6;
  }
  input:focus 		{ outline:none; }

  /* LABEL ======================================= */
  label 				 {
    color:#999; 
    font-size:16px;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:10px;
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }

  /* active state */
  input:focus ~ label, input:valid ~ label 		{
    top:-10px;
    font-size:14px;
    color:#000000;
  }

  /* BOTTOM BARS ================================= */
  .bar 	{ position:relative; display:block; width:300px; }
  .bar:before, .bar:after 	{
    content:'';
    height:2px; 
    width:0;
    bottom:1px; 
    position:absolute;
    background:#b0042b; 
    transition:0.2s ease all; 
    -moz-transition:0.2s ease all; 
    -webkit-transition:0.2s ease all;
  }
  .bar:before {
    left:50%;
  }
  .bar:after {
    right:50%; 
  }

  /* active state */
  input:focus ~ .bar:before, input:focus ~ .bar:after {
    width:50%;
  }

  /* HIGHLIGHTER ================================== */
  .highlight {
    position:absolute;
    height:60%; 
    top:25%; 
    left:0;
    pointer-events:none;
    opacity:0;
  }

  /* active state */
  input:focus ~ .highlight {
    -webkit-animation:inputHighlighter 0.3s ease;
    -moz-animation:inputHighlighter 0.3s ease;
    animation:inputHighlighter 0.3s ease;
  }

  /* ANIMATIONS ================ */
  @-webkit-keyframes inputHighlighter {
    from { background:#b0042b; }
    to 	{ width:0; background:transparent; }
  }
  @-moz-keyframes inputHighlighter {
    from { background:#b0042b; }
    to 	{ width:0; background:transparent; }
  }
  @keyframes inputHighlighter {
    from { background:#b0042b; }
    to 	{ width:0; background:transparent; }
  }
</style>
