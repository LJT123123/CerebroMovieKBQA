<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
  height: 100%;
}
#app {
  /*font-family: "Raleway", Helvetica, Arial, sans-serif;*/
  font-family: Arial;
  -webkit-font-feature-settings: "lunm";
  font-feature-settings: "lunm";
  width: 100%;
  position: absolute;
  -webkit-font-smoothing: antialiased;
  /*background-color: rgba(245,245,245,0.8);*/
  word-wrap:break-word;
}
.CodeMirror{
  font-family: Menlo,Monaco,Consolas,Courier New,monospace !important;
  font-size: 14px;
  line-height: 1.846;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6 {
  color: #363b40;
  font-weight: 500;
  letter-spacing: -0.1px;
}
.neo4jd3-info {
  font-size: 16px;
  padding: 10px;
  position: absolute;
}
.neo4jd3-info a {
  border: 1px solid;
  display: inline-block;
  font-size: 14px;
  line-height: 1.428571429;
  margin-left: 5px;
  margin-top: 5px;
  padding: 6px 12px;
}
.neo4jd3-info a.class {
  color: white;
}
.neo4jd3-info a.property {
  background-color: #fff;
  border-color: #ccc;
  color: #333;
}
.neo4jd3-info a.btn {
  margin-left: 5px;
  margin-top: 5px;
  opacity: 1;
}
.neo4jd3-info a.info {
  background-color: #a5abb6;
  border: 1px solid #9aa1ac;
  color: white;
}

.node.node-highlighted .ring {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)';
  filter: alpha(opacity=50);
  opacity: .5;
  stroke: #888;
  stroke-width: 12px;
}
.node .outline {
  cursor: pointer;
  fill: #a5abb6;
  pointer-events: all;
  stroke: #9aa1ac;
  stroke-width: 2px;
}
.node .ring {
  fill: none;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  opacity: 0;
  stroke: #6ac6ff;
  stroke-width: 8px;
}
.node .text.icon {
  font-family: FontAwesome;
}

.node.selected .ring,
.node:hover .ring {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';
  filter: alpha(opacity=30);
  opacity: .3;
}

.relationship {
  cursor: default;
}
.relationship line {
  stroke: #aaa;
}
.relationship .outline {
  cursor: default;
  opacity: 0.8;
  /*-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0.5)';*/
  /*filter: alpha(opacity=0.5);*/
}

.relationship .overlay {
  cursor: default;
  fill: #6ac6ff;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
  filter: alpha(opacity=0);
  opacity: 0;
}
.relationship text {
  cursor: default;
}

.relationship.selected .overlay,
.relationship:hover .overlay {
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';
  filter: alpha(opacity=30);
  opacity: .3;
}

svg {
  cursor: move;
}
</style>
