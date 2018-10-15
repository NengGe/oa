<template>
  <div class="videomain">
    <template v-if="list&&list.length">
      <div class="banner"><img :src="server+list[0].banner_img_url"></div>
      <div class="lists">
        <ul>
          <li v-for="item in list" :key="item.video_id">
            <div class="photo"><img :src="server+item.campus_img_url"></div>
            <div class="video-btn">
              <a class="dianbo" @click="() => {dianboShow(item)}">分享</a>
              <a class="zhibo" :href="getPalyUrl(item)">直播</a>
              <!--<router-link class="zhibo" :to="{name:'videoCheck',query: {
                url:item.video_url,
                title:item.video_name,
                img:item.campus_img_url
            }}">直播
              </router-link>-->
              <!-- <a href="#" class="bds_weixin" onclick="weixinShareTimeline()">微信</a> -->
            </div>
            <p><a>{{item.campus_name}}</a></p>
          </li>
        </ul>
      </div>
    </template>
    <div class="no-data" v-if="noData">没有视频</div>
  </div>
</template>
<script>
  /* eslint-disable */
  let list = null
  if (process.env.NODE_ENV !== 'production') {
    list = [
      {
        'video_id': '1513329334476',
        'campus_name': '南校区',
        'campus_img_url': 'http://zhibo.shendupeiban.com/UploadFiles/Banners/71fabe9812d74c8eb38b3364192f9639_video-photo_10.jpg',
        'video_name': '深圳高级中学集团-南校区直播',
        'video_url': 'http://9491.liveplay.myqcloud.com/live/9491_gjzxn.m3u8',
        'banner_name': 'banner.jpg',
        'banner_img_url': 'http://zhibo.shendupeiban.com/UploadFiles/Banners/0c7d6f7ec8ee41459ad2688a16501c09_banner.jpg'
      },
      {
        'video_id': '1513233021004',
        'campus_name': '中心校区',
        'campus_img_url': 'http://zhibo.shendupeiban.com/UploadFiles/Banners/366cbeb8981e4d33ae6e00aae1114e43_photo.jpg',
        'video_name': '深圳高级中学集团-中心校区',
        'video_url': '03000801005A1FB655BBDD003E880368A7D311-D37E-C010-8BDC-61F237B936D2.mp4',
        'banner_name': 'banner.jpg',
        'banner_img_url': 'http://zhibo.shendupeiban.com/UploadFiles/Banners/0c7d6f7ec8ee41459ad2688a16501c09_banner.jpg'
      },
      {
        'video_id': '1513329334477',
        'campus_name': '南校区',
        'campus_img_url': 'http://zhibo.shendupeiban.com/UploadFiles/Banners/71fabe9812d74c8eb38b3364192f9639_video-photo_10.jpg',
        'video_name': '深圳高级中学集团-南校区直播',
        'video_url': 'http://9491.liveplay.myqcloud.com/live/9491_gjzxn.m3u8',
        'banner_name': 'banner.jpg',
        'banner_img_url': 'http://zhibo.shendupeiban.com/UploadFiles/Banners/0c7d6f7ec8ee41459ad2688a16501c09_banner.jpg'
      }
    ]
  }

  export default {
    data () {
      return {
        list,
        // server: 'https://api.shendupeiban.com',
        server: '',
        noData: false
      }
    },
    methods: {
      dianboShow (params) {
        let {video_url, video_name, campus_img_url} = params
        window.oa.emitVideoShareParams(JSON.stringify({
          title: video_name,
          content: '',
          img_url: campus_img_url,
          video_url: `http://openapp.shendupeiban.com/OA-online/pages/video/video-check.html?${this.videoType(video_url)}=${video_url}&title=${video_name}&img=${campus_img_url}`
        }))
      },
      videoType (url) {
        return url.match(/[^.]+$/)[0]
      },
      getPalyUrl (params) {
        let {video_url, video_name, campus_img_url} = params
        video_url = encodeURIComponent(video_url)
        video_name = encodeURIComponent(video_name)
        campus_img_url = encodeURIComponent(campus_img_url)
        return `http://openapp.shendupeiban.com/OA-online/pages/video/video-check.html?${this.videoType(video_url)}=${video_url}&title=${video_name}&img=${campus_img_url}`
      }
    },
    mounted () {
      this.$axios.get('/mobicampus/tvstation/v1/gettvlist').then(({data}) => {
        if (data.status === 200) {
          if ((this.list = data.result.data).length === 0) {
            this.noData = true
          }
        }
      }).catch(e => {
        this.$simpleMsg(e)
        this.noData = true
      })
    }
  }
</script>

<style scoped>
  /*body {
    !*padding-top: 53px;*!
    background: #f0f8fc;
    min-height: 100vh;
    box-sizing: border-box;
  }*/
  .no-data {
    text-align: center;
    font-size: 20px;
  }

  .videomain {
    max-width: 750px;
    margin: 0 auto;
    padding: 0 6px;
    padding-top: 5px;
    box-sizing: border-box;
  }

  .photo {
    float: left;
  }

  .videomain .banner {
    width: 100%;
  }

  .videomain .banner img {
    width: 100%;
  }

  .videomain .lists {
    padding-top: 4px;
    width: 100%;
  }

  .videomain .lists ul {
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .videomain .lists ul li {
    list-style-type: none;
    width: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 4px #eaeef2;
    margin-bottom: 12px;
    display: inline-block;
    position: relative;
  }

  .videomain .lists ul li img {
    width: 78px;
    margin-top: 9px;
    margin-left: 15px;
    margin-bottom: 2px;
  }

  .videomain .lists ul li p {
    color: #868686;
    margin-left: 14px;
    font-size: 17px;
    line-height: 78px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 14px;
  }

  .videomain .lists ul li p a {
    color: #868686;
  }

  .video-btn {
    float: right;
    padding-right: 14px;
    box-sizing: border-box;
    height: 100%;
  }

  /* .video-btn button, */
  .video-btn a {
    border: none;
    outline: none;
    background: none;
    height: 32px;
    margin-top: 22px;
    font-size: 17px;
    float: left;
    width: 51px;
    padding: 0;
  }

/*   .video-btn button.dianbo {
    background: #ddd;
    border: 1PX solid #ddd;
    border-radius: 2px;
    color: #fff;
  } */

  .video-btn a {
    text-align: center;
    line-height: 30px;
    background: none;
    border: 1PX solid #12b7f5;
    border-radius: 2px;
    color: #12b7f5;
    margin-left: 7px;
    box-sizing: border-box;
  }

  /*  .video-btn button.zhibo {
      background: none;
      border: 1PX solid #12b7f5;
      border-radius: 2px;
      color: #12b7f5;
      margin-left: 7px;
    }*/

  /*  .bdsharebuttonbox {
      position: absolute;
      width: 40px;
      height: 60px;
      background: #f00;
      right: 0;
      top: 0;
    }

    #video-box {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999999;
    }

    #video-container {
      width: 100%;
      height: 100%;
      background: #000;
      display: flex;
      display: -webkit-flex;
      align-items: center;
    }

    #clothe {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 6px;
      top: 6px;
      font-size: 24px;
      color: #fff;
      transition: opacity 0.5s ease;
      -webkit-transition: opacity 0.5s ease;
    }*/
</style>
