<template>
  <div class="DetailCommenInfo">
    <div class="comment-head">
      <span class="user-comment">用户评价</span>
      <a href="javascript:void(0)">
        <span class="more">更多</span>
      </a>
    </div>
    <div class="comment-content" v-if="Object.keys(commentInfo).length !== 0">
      <div class="user-info">
        <img :src="commentInfo.user.avatar" />
        <span class="user-name">{{commentInfo.user.uname}}</span>
      </div>
      <div class="user-comment-content">
        <p class="comment-text">{{commentInfo.content}}</p>
        <span>{{commentInfo.created | formatTime('yyyy-MM-dd')}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="goods-thumbnail">
        <div v-for="(item, index) in commentInfo.images" :key="index">
          <img :src="item"/>
        </div>
      </div>
    </div>
    <div class="recommend">精品推荐</div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    formatTime(data, arg) {
      return formatDate(new Date(data * 1000), arg)
    }
  }
};
</script>

<style scoped>
.DetailCommenInfo {
  padding: 10px;
}
.comment-head {
  line-height: 40px;
  border-bottom: 1px solid #eee;
}
.comment-head::after {
  content: "";
  clear: both;
  display: table;
}
.user-comment {
  float: left;
}
a {
  float: right;
}

.user-info {
  height: 40px;
  line-height: 40px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.user-info .user-name {
  margin-left: 10px;
}
.user-info img {
  float: left;
  border-radius: 50%;
  height: 50px;
}

.comment-text {
  font-size: 16px;
  line-height: 25px;
  margin-bottom: 5px;
}


.user-comment-content span {
  color: #aaa;
  font-size: 14px;
  margin-right: 10px;
}
.goods-thumbnail{
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.goods-thumbnail div {

  width: 6rem;
  height: 6rem;
  vertical-align: middle;
  font-size: 0;
  margin-right: 5px;
  overflow: hidden;
}
.goods-thumbnail img{
  width: 100%;
}
.recommend{
  border-top: 1px solid #eee;
  padding-top: 10px;
  margin-top: 10px;
  color:#555;
  font-size: 16px;
  font-weight: bold;
}
</style>