<template>
  <div :style="{ height: screenHeight + 'px' }" class="wrapper" style="background-color: gainsboro;">

    <div class="main"  :style="'overflow: visible;width:100%;margin: 40px auto;'+minWidth">

      <iframe class="mapFrame" ref="mapFrame" src="static/redirect.html" :style="'margin-left:5%;width:90%;height: '+frameHeight+';min-height:590px; float: left;overflow: visible;'" scrolling="no"
              frameborder="0" >
      </iframe>

      <!-- <iframe class="mapFrame" ref="mapFrame" src="static/index_max.html" style="margin-left:5%;width:40%;height: 590px;float: left;" scrolling="no"
              frameborder="0" >
      </iframe> -->

      <!-- <div style=";width:46%;height: 580px;margin-left:3%;background-color: white;float: left;">
        右边
      </div> -->
    </div>

<<<<<<< HEAD
=======

    <div class="footer" :style="'text-align: center;margin-top: -40px;'+minWidth">
      <div style>
        <el-button type="text" @click="dialogVisible1 = true" style="margin-left:8px;font-size: 1.0rem;color: #777777;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif">Follow Us</el-button>
        <i class="el-icon-user-solid"></i>
        <el-dialog
          title="CodeWisdom"
          :visible.sync="dialogVisible1"
        >

          <span><h6 style="margin-left: 18px">Welcome to follow us !</h6><img alt="CodeWisdom" src="http://codewisdom.net/Cerebro/static/image/CodeWisdom.jpg"></span>
        </el-dialog>
        <span style="margin-left:8px;font-size: 1.0rem;color: #777777;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif">|</span>
        <el-button type="text" @click="dialogVisible2 = true" style="margin-left:8px;font-size: 1.0rem;color: #777777;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif">Contact Us</el-button>
        <i class="el-icon-message"></i>
        <el-dialog
          title="Contact Us"
          :visible.sync="dialogVisible2"
          width="40%"
        >
          <span><h6 style="margin-left: 18px">Your valuable comments are welcome at any time.</h6><p>Email: 19110240019@fudan.edu.cn</p>
          <p style="margin-left: 18px;margin-right: 18px">You can also tell Cerebro what you want it to improve, and it will continue to grow. (ง ˙o˙)ง</p>
          </span>
        </el-dialog>

        <span style="margin-left:8px;font-size: 1.0rem;color: #777777;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif">|</span>
        <el-button type="text" @click="dialogFormVisible= true" style="margin-left:8px;font-size: 1.0rem;color: #777777;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif">Feedback</el-button>
        <i class="el-icon-edit-outline"></i>
        <el-dialog
          title="Feedback"
          :visible.sync="dialogFormVisible"
          width="40%"
        >
          <form style="width: 90%; margin-left:5%">
            <div class="form-group">
              <!--                          <label for="Name">Name</label>-->
              <input style="margin-bottom: 6px" type="text" class="form-control" id="Name" placeholder="Title" v-model="feedbackInfo.title">
            </div>
            <!--                        <div class="form-group">-->
            <!--                          <label for="Affilation">Affilation</label>-->
            <!--                          <input type="text" class="form-control" id="Affilation" placeholder="Affilation">-->
            <!--                        </div>-->
            <div class="form-group">
              <!--                          <label for="Email">Email</label>-->
              <input style="margin-bottom: 6px" type="email" class="form-control" id="Email" placeholder="Email" v-model="feedbackInfo.email">
            </div>
            <div class="form-group">
              <!--                          <label for="YourFeedback">Your Feedback</label>-->
              <textarea type="textarea" class="form-control" id="YourFeedback" placeholder="Your Feedback" rows="5" v-model="feedbackInfo.text"></textarea>
            </div>
          </form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="feedback">Submit</el-button>
          </div>
        </el-dialog>
        <div style="margin-top:10px;color: #777777">v3.0.0</div>
      </div>

    </div>
>>>>>>> c7ecb7cf331979c7b391418e3442be23cff35745
  </div>
</template>
<script>
import axios from 'axios';
import $ from 'jquery'
export default {
  name: 'Cerebro_new',
  data() {
    return {
      screenHeight: document.body.clientHeight,
      frameHeight: "100%",
      minWidth: "min-width: 1100px;",
      dialogVisible: false,
      dialogVisible1:false,
      dialogVisible2:false,
      dialogFormVisible:false,
      iframeWin: {},
      feedbackInfo: {
        title: '',
        text: '',
        email: ''
      },
      url: 'http://codewisdom.net/Cerebro/static/image/concept_explanation.png',
      url1: 'http://codewisdom.net/Cerebro/static/image/api_usage.png',
      url2: 'http://codewisdom.net/Cerebro/static/image/api_knowledge.png',
      url3: 'http://codewisdom.net/Cerebro/static/image/api_vs2.jpg',
      url4: 'http://codewisdom.net/Cerebro/static/image/task_api_search.png',
      url5: 'http://codewisdom.net/Cerebro/static/image/task_code_search.png',
      url6: 'http://codewisdom.net/Cerebro/static/image/task_library_search.png',
      url7: 'http://codewisdom.net/Cerebro/static/image/library_knowledge_query.png',
      url8: 'http://codewisdom.net/Cerebro/static/image/learning_resources_recommend.png',
      srcList: [
        'http://codewisdom.net/Cerebro/static/image/concept_explanation.png',
      ],
      srcList1: [
        'http://codewisdom.net/Cerebro/static/image/api_usage.png',
      ],
      srcList2: [
        'http://codewisdom.net/Cerebro/static/image/api_knowledge.png',
      ],
      srcList3: [
        'http://codewisdom.net/Cerebro/static/image/api_vs1.png',
      ],
      srcList4: [
        'http://codewisdom.net/Cerebro/static/image/task_api_search.png',
      ],
      srcList5: [
        'http://codewisdom.net/Cerebro/static/image/task_code_search.png',
      ],
      srcList6: [
        'http://codewisdom.net/Cerebro/static/image/task_library_search.png',
      ],
      srcList7: [
        'http://codewisdom.net/Cerebro/static/image/library_knowledge_query.png',
      ],
      srcList8: [
        'http://codewisdom.net/Cerebro/static/image/learning_resources_recommend.png',
      ],
      activeName:'1',
      taskbased_code_search:'int to String',
      taskbased_api_search:'I want to find an API for my task.',
      taskbased_library_search:'I want to find a library for my task.',
      find_simple_code:'int to string',
      library_knowledge_query:'What language is Spotbugs written by?',
      learn_about_API:'StringBuffer\'s functionality',
      API_usage:'How can I use StringBuffer?',
      compare_two_APIs:'StringBuffer vs StringBuilder',
      learning_resources_recommend:'Where can I find some learning resources for Python?',
      explain_concept:'What is java?',
      ip: '',
      getText:'',
      explain_concepts_in_code:'public class HelloWorld {\n' +
        '    public static void main(String[] args) {\n' +
        '        System.out.println("Hello World");\n' +
        '    }\n' +
        '}'
    };
  },
  watch: {
    screenHeight (val) {
      if (!this.timer) {
        this.screenHeight = val
        this.timer = true
        let that = this
        setTimeout(function () {
          console.log(that.screenHeight)
          that.timer = false
        }, 400)
      }
    }
  },
  mounted(){
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
    var Ip=localStorage.getItem('Ip')
    var cityname=localStorage.getItem('cityname')
    console.log(localStorage.getItem('Ip'))
    console.log(cityname)
    // axios
    //   .post('http://47.116.194.87/Cerebro/add_ip/',
    //     {
    //       ip: Ip,
    //       city: cityname,
    //     })
    //   .then(response => {
    //     console.log(Ip)
    //     // console.log(returnCitySN)
    //     console.log(cityname)
    //     // }
    //   })
    //   .catch(error => console.log(error))
    var div1 = document.getElementById("div2");
    //div1.click()
  },
  created() {
    if (this._isMobile()) {
      this.frameHeight = "1200px";
      this.minWidth = "";
    } else {
      this.frameElement = "590px;";
    }
  },
  methods: {
    changeNodeMsg(){
      alert(0)
    },

    sendMessage1(){
      let mapFrame = this.$refs['mapFrame']
        console.log(mapFrame)
        let iframeWin = mapFrame.contentWindow
        $('.div1').click(function(event) {
          var event = event || e;
          console.log(event.currentTarget.id);  //获取id属性值
          console.log(event.currentTarget.dataset.name);  //获取自定义data-属性值
          this.getText = $(this).text();
          console.log($(this).text());
          console.log(this.getText)
          // axios
          //   .post('http://47.116.194.87/Cerebro/user_input/',
          //     {
          //       input: this.getText,
          //     })
          //   .then(response => {
          //     console.log(response)
          //     // }
          //   })
          //   .catch(error => console.log(error))
          iframeWin.postMessage({
            cmd: 'getDate',
            data: this.getText
          }, '*')
        });
      },
    // sendMessage2(){
    //   let mapFrame = this.$refs['mapFrame']
    //   console.log(mapFrame)
    //   let iframeWin = mapFrame.contentWindow
    //   iframeWin.postMessage({
    //     cmd:'getDate',
    //     data:this.compare_two_APIs
    //   },'*')
    // },
    feedback () {
      console.log(this.feedbackInfo)
      this.dialogFormVisible = false
      axios
        .post('http://47.116.194.87/Cerebro/insert/',
          {
            title: this.feedbackInfo.title,
            text: this.feedbackInfo.text,
            email: this.feedbackInfo.email
          })
        .then(response => {
          // if (response.data["success"]) {
          alert("Feedback success, thank you very much.")
          // this.hide_feedback()
          this.feedbackInfo.title = ''
          this.feedbackInfo.text = ''
          this.feedbackInfo.email = ''
          // }
        })
        .catch(error => console.log(error))
    },
    copyShaneUrl(shareLink){
      var input = document.createElement("input");   // 直接构建input
      input.value = shareLink;  // 设置内容
      document.body.appendChild(input);    // 添加临时实例
      input.select();   // 选择实例内容
      document.execCommand("Copy");   // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message({
        message: 'Congratulations on your successful copy~  Go and talk to Cerebro quickly!   ੭ ˙ᗜ˙ )੭',
        type: 'success'
      });
    },
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },
}
</script>

<style>
html {
  /*height: 100%;*/
  /*display: table;*/
  background-color: gainsboro;
  display: flex;
  /*justify-content: center;*/
  /*align-items: center;*/
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.carousel_image_type{
  width: 100%;
  height: 100%;
}
.wrapper {
  display: flex;
  flex-direction: column;
  /*min-height: 100%;*/
}
.main{
  flex: 1;
  /*background-color:saddlebrown;*/
  width: 90%;
}
.footer {
  flex: 0;
}
</style>

