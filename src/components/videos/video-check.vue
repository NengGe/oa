<template>
    <div>
        <img id="zhibo-img" :src="list.img" style="position:absolute; left:-9999px;">
        <div id="lianjie" style="width:0; height:0; opacity:0;"></div>
        <!-- <a href="javascript:void(0)" onClick="javascript :history.back(-1);" id="clothe">✕</a> -->
        <div id="video-container" style="margin: 0px auto;"></div>
    </div>
</template>

<script>
/* eslint-disable */
    import {TcPlayer} from 'TcPlayer.js'
    export default {
        data() {
            return{
                list:''
            }
        },
        methods: {
            videocheck(){
                var that = this

                function getParams(name) {
                    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) {
                        return decodeURIComponent(r[2]);
                    }
                    return null;
                }
                var rtmp = getParams('rtmp'),
                    flv  = getParams('flv'),
                    m3u8 = getParams('m3u8'),
                    mp4  = getParams('mp4'),
                    live = (getParams('live') == 'true' ? true : false),
                    coverpic = getParams('coverpic'),
                    width = getParams('width'),
                    height = getParams('height'),
                    autoplay = (getParams('autoplay') == 'true' ? true : false);
                /**
                 * 视频类型播放优先级
                 * mobile ：m3u8>mp4
                 * PC ：RTMP>flv>m3u8>mp4
                 */
                var options = {
                    rtmp: rtmp,
                    flv: flv  ,
                    flv_hd: flv ,
                    flv_sd: flv ,
                    m3u8: m3u8 || this.list.url,
                    // m3u8_hd: m3u8 || 'http://1251132611.vod2.myqcloud.com/4126dd3evodtransgzp1251132611/8a592f8b9031868222950257296/f0.f230.m3u8',
                    // m3u8_sd: m3u8 || 'http://1251132611.vod2.myqcloud.com/4126dd3evodtransgzp1251132611/8a592f8b9031868222950257296/f0.f220.m3u8',
                    // mp4 : mp4 || 'http://1251132611.vod2.myqcloud.com/4126dd3evodtransgzp1251132611/8a592f8b9031868222950257296/f0.f40.mp4',
                    // mp4_hd :  'http://1251132611.vod2.myqcloud.com/4126dd3evodtransgzp1251132611/8a592f8b9031868222950257296/f0.f40.mp4',
                    // mp4_sd :  'http://1251132611.vod2.myqcloud.com/4126dd3evodtransgzp1251132611/8a592f8b9031868222950257296/f0.f20.mp4',
                    coverpic: coverpic ,
                    autoplay: autoplay ? true : false,
                    live: true,
                    width : width || '100'+'%',
                    height : height || 'auto'
                };
                var player = new TcPlayer('video-container', options);
                window.tcplayer  = player;
            }
        },
        mounted() {
            console.log(this.$route)
            this.list = this.$route.query
            console.log(this.list)
            console.log(TcPlayer)
            this.videocheck()
            document.title = this.list.title
        }
    }

</script>
<style scoped>
    /* body{
        margin: 0;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        background: #000;
    } */
    #video-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: none;
        background: #000;
    }
    #video-container {
        width: 100%;
        height: 100vh;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        background: #000;
    }
    #clothe{
        width: 24px;
        height: 24px;
        position: absolute;
        right: 6px;
        top: 6px;
        font-size: 24px;
        color: #fff;
        transition: opacity 0.5s ease;
        -webkit-transition: opacity 0.5s ease;
        text-decoration: none;
    }
</style>
