<template>
  <div class="commonProblem-wrap">
    <div class="problem-container">
      <div class="problem-l">
        <ul>
          <li><h3>常见问题</h3></li>
          <li class="active-hover" v-for="(item, index) in data"
              :class="{'active': activeIndex === index}"
              @click='changeQuestion(item, index)'>{{item}}</li>
        </ul>
      </div>
      
      <div class="problem-r">
        <div class="question-QA">
          <div class="question-Q">1、<span>腾讯儿童手表5C支持什么类型的SIM卡？</span></div>
          <p class="question-A">手表主屏时，短按熄屏；手表熄屏状态时，短按唤醒屏幕；在任何非主屏时，短按返回主屏；关机状态下，长按开机，开机时震动提示；在任何界面，长按5s发起SOS。</p>
        </div>
  
        <div class="question-QA">
          <div class="question-Q">2、<span>腾讯儿童手表5C支持什么类型的SIM卡？</span></div>
          <p class="question-A">手表主屏时，短按熄屏；手表熄屏状态时，短按唤醒屏幕；在任何非主屏时，短按返回主屏；关机状态下，长按开机，开机时震动提示；在任何界面，长按5s发起SOS。</p>
        </div>
  
        <div class="question-QA">
          <div class="question-Q">3、<span>腾讯儿童手表5C支持什么类型的SIM卡？</span></div>
          <p class="question-A">手表主屏时，短按熄屏；手表熄屏状态时，短按唤醒屏幕；在任何非主屏时，短按返回主屏；关机状态下，长按开机，开机时震动提示；在任何界面，长按5s发起SOS。</p>
        </div>
  
        <div class="question-QA">
          <div class="question-Q">4、<span>腾讯儿童手表5C支持什么类型的SIM卡？</span></div>
          <p class="question-A">手表主屏时，短按熄屏；手表熄屏状态时，短按唤醒屏幕；在任何非主屏时，短按返回主屏；关机状态下，长按开机，开机时震动提示；在任何界面，长按5s发起SOS。</p>
        </div>
  
        <div class="question-QA">
          <div class="question-Q">5、<span>腾讯儿童手表5C支持什么类型的SIM卡？</span></div>
          <p class="question-A">手表主屏时，短按熄屏；手表熄屏状态时，短按唤醒屏幕；在任何非主屏时，短按返回主屏；关机状态下，长按开机，开机时震动提示；在任何界面，长按5s发起SOS。</p>
        </div>
  
        <div class="question-QA">
          <div class="question-Q">6、<span>腾讯儿童手表5C支持什么类型的SIM卡？</span></div>
          <p class="question-A">手表主屏时，短按熄屏；手表熄屏状态时，短按唤醒屏幕；在任何非主屏时，短按返回主屏；关机状态下，长按开机，开机时震动提示；在任何界面，长按5s发起SOS。</p>
        </div>
  
        <div class="question-QA">
          <div class="question-Q">7、<span>腾讯儿童手表5C支持什么类型的SIM卡？</span></div>
          <p class="question-A">手表主屏时，短按熄屏；手表熄屏状态时，短按唤醒屏幕；在任何非主屏时，短按返回主屏；关机状态下，长按开机，开机时震动提示；在任何界面，长按5s发起SOS。</p>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonProblem',
  data() {
    return {
      data: ['S3', 'X1'],
      activeIndex: 0
    };
  },

  methods: {
    changeQuestion(item, index) {
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
  .active {
    background: #14b7f5;
    color: #fff!important;
  }
  
  .active-hover:hover {
    background: #14b7f5;
    color: #fff!important;
  }
  
  .problem-container {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    .problem-l {
      width: 285px;
      margin-right: 20px;
      background: #fff;
      ul {
        font-size: 18px;
        font-weight: bold;
        li {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 60px;
          padding: 0 20px;
          color: #9a9a9a;
          &:first-child {
            justify-content: start;
            color: #333;
          }
        }
      }
    }
    
    .problem-r {
      width: calc(1200px - 285px - 20px);
      background: #fff;
      padding: 65px 45px;
      .question-QA {
        .question-Q {
          font-size: 16px;
          font-weight: bold;
          span {
            margin-left: 1em;
          }
        }
        
        .question-A {
          color: #959595;
          margin: 20px 0 40px calc(2rem + 5px);
        }
      }
    }
    
  }
</style>
