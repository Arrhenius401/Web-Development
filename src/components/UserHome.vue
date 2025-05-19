<template>
  <div>
    <h2>Home页面</h2>
    <p>{{ username }}---欢迎光临</p>
    <button @click.prevent="domesticNews" >国内新闻</button>
    <button @click.prevent="internationalNews">国际新闻</button>
    <p>{{ varyingText }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'admin',
      varyingText: ''
    };
  },
  methods:{
    domesticNews(){
      this.varyingText = '受贿1.29亿余元 ，黑龙江原副省长王一新被判无期'
    },
    internationalNews(){
      this.varyingText = '俄乌直接会谈开始'
    }
  }
};
</script>