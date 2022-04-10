var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
    try {
        return window.getComputedStyle ?
            window.getComputedStyle(el)[attr] :
            el.currentStyle[attr];
    } catch (e) {}
    return "";
};

class Cursor {
    constructor() {
        this.pos = {
            curr: null,
            prev: null
        };
        this.pt = [];
        this.create();
        this.init();
        this.render();
    }

    move(left, top) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }

        var el = document.getElementsByTagName('*');
        for (let i = 0; i < el.length; i++)
            if (getStyle(el[i], "cursor") == "pointer")
                this.pt.push(el[i].outerHTML);

        document.body.appendChild((this.scr = document.createElement("style")));
        this.scr.innerHTML =
            `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5'/></svg>") 4 4, auto}`;
    }

    refresh() {
        this.scr.remove();
        this.cursor.classList.remove("hover");
        this.cursor.classList.remove("active");
        this.pos = {
            curr: null,
            prev: null
        };
        this.pt = [];

        this.create();
        this.init();
        this.render();
    }

    init() {
        document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
        document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
        document.onmousemove = e => {
            (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8);
            this.pos.curr = {
                x: e.clientX - 8,
                y: e.clientY - 8
            };
            this.cursor.classList.remove("hidden");
        };
        document.onmouseenter = e => this.cursor.classList.remove("hidden");
        document.onmouseleave = e => this.cursor.classList.add("hidden");
        document.onmousedown = e => this.cursor.classList.add("active");
        document.onmouseup = e => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.prev) {
            this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.45);
            this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.45);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());
    }
}

(() => {
    CURSOR = new Cursor();
    // 需要重新获取列表时，使用 CURSOR.refresh()
})();
/*!
 * china-lantern v1.6.0
 * (c) 2020-2021 fz6m
 * Released under the MIT License.
 */
! function (t) {
    "function" == typeof define && define.amd ? define(t) : t()
}((function () {
    "use strict";
    ! function (t, e) {
        void 0 === e && (e = {});
        var n = e.insertAt;
        if (t && "undefined" != typeof document) {
            var r = document.head || document.getElementsByTagName("head")[0],
                a = document.createElement("style");
            a.type = "text/css", "top" === n && r.firstChild ? r.insertBefore(a, r.firstChild) : r.appendChild(a), a.styleSheet ? a.styleSheet.cssText = t : a.appendChild(document.createTextNode(t))
        }
    };
    var t;
    (t = document.createElement("div")).className = "j-china-lantern", t.innerHTML = '<div class="lantern__warpper"><div class="lantern__box"><div class="lantern__line"></div><div class="lantern__circle"><div class="lantern__ellipse"><div class="lantern__text">新</div></div></div><div class="lantern__tail"><div class="lantern__rect"></div><div class="lantern__junction"></div></div></div></div><div class="lantern__warpper lantern__secondary"><div class="lantern__box"><div class="lantern__line"></div><div class="lantern__circle"><div class="lantern__ellipse"><div class="lantern__text">年</div></div></div><div class="lantern__tail"><div class="lantern__rect"></div><div class="lantern__junction"></div></div></div></div>', document.body.appendChild(t)
}));
//弹窗样式
iziToast.settings({
  timeout: 10000,
  progressBar: false,
  close: false,
  closeOnEscape: true,
  position: "topCenter",
  transitionIn: "bounceInDown",
  transitionOut: "flipOutX",
  displayMode: "replace",
  layout: "1",
  backgroundColor: "#00000040",
  titleColor: "#efefef",
  messageColor: "#efefef",
  iconColor: "#efefef",
});

//加载完成后执行
window.addEventListener(
  "load",
  function () {
    //载入动画
    $("#loading-box").attr("class", "loaded");
    $("#section").css(
      "cssText",
      "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important"
    );

    //用户欢迎
    setTimeout(function () {
      iziToast.show({
        timeout: 2500,
        title: hello,
        message: "欢迎来到我的主页",
      });
    }, 800);
  },
  false
);

setTimeout(function () {
  $("#loading-text").html("字体及文件加载可能需要一定时间");
}, 3000);

//延迟加载音乐播放器
function downloadJSAtOnload() {
  var element = document.createElement("script");
  element.src = "./js/music.js";
  document.body.appendChild(element);
}
if (window.addEventListener)
  window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent) window.attachEvent("onload", downloadJSAtOnload);
else window.onload = downloadJSAtOnload;

//新春灯笼 （ 需要时取消注释 ）
/*
new_element=document.createElement("link");
new_element.setAttribute("rel","stylesheet");
new_element.setAttribute("type","text/css");
new_element.setAttribute("href","./css/lantern.css");
document.body.appendChild(new_element);

new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","./js/lantern.js");
document.body.appendChild(new_element);
*/

//火狐浏览器独立样式
if ((isFirefox = navigator.userAgent.indexOf("Firefox") > 0)) {
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.href = "./css/firefox.css";
  link.rel = "stylesheet";
  link.type = "text/css";
  head.appendChild(link);
  window.addEventListener(
    "load",
    function () {
      iziToast.show({
        timeout: 8000,
        iconUrl: "./img/warn.png",
        message: "您正在使用火狐浏览器，部分功能可能不支持",
      });
    },
    false
  );
}

//获取一言
fetch("https://v1.hitokoto.cn?max_length=35&c=d&c=e&c=h&c=k&c=h")
  .then((response) => response.json())
  .then((data) => {
    $("#hitokoto_text").html(data.hitokoto);
    $("#from_text").html(data.from);
  })
  .catch(console.error);

//获取天气
//每日限量 100 次
//请前往 https://www.tianqiapi.com/ 申请（免费）
fetch(
  "https://www.yiketianqi.com/free/day?appid=43986679&appsecret=TksqGZT7&unescape=1"
)
  .then((response) => response.json())
  .then((data) => {
    $("#wea_text").html(data.wea);
    $("#city_text").html(data.city);
    $("#tem_night").html(data.tem_night);
    $("#tem_day").html(data.tem_day);
    $("#win_text").html(data.win);
    $("#win_speed").html(data.win_speed);
  })
  .catch(console.error);

//获取时间
var t = null;
t = setTimeout(time, 1000);

function time() {
  clearTimeout(t);
  dt = new Date();
  var y = dt.getYear() + 1900;
  var mm = dt.getMonth() + 1;
  var d = dt.getDate();
  var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  var day = dt.getDay();
  var h = dt.getHours();
  var m = dt.getMinutes();
  var s = dt.getSeconds();
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  //document.getElementById("time").innerHTML = y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>";
  $("#time").html(
    y +
      "&nbsp;年&nbsp;" +
      mm +
      "&nbsp;月&nbsp;" +
      d +
      "&nbsp;日&nbsp;" +
      "<span class='weekday'>" +
      weekday[day] +
      "</span><br>" +
      "<span class='time-text'>" +
      h +
      ":" +
      m +
      ":" +
      s +
      "</span>"
  );
  t = setTimeout(time, 1000);
}

//链接提示文字
$("#social")
  .mouseover(function () {
    $("#social").css({
      background: "rgb(0 0 0 / 25%)",
      "border-radius": "6px",
      "backdrop-filter": "blur(5px)",
    });
    $("#link-text").css({
      display: "block",
    });
  })
  .mouseout(function () {
    $("#social").css({
      background: "none",
      "border-radius": "6px",
      "backdrop-filter": "none",
    });
    $("#link-text").css({
      display: "none",
    });
  });

$("#github")
  .mouseover(function () {
    $("#link-text").html("去 Github 看看");
  })
  .mouseout(function () {
    $("#link-text").html("我的联系方式");
  });
$("#qq")
  .mouseover(function () {
    $("#link-text").html("有什么事吗");
  })
  .mouseout(function () {
    $("#link-text").html("我的联系方式");
  });
$("#email")
  .mouseover(function () {
    $("#link-text").html("来封 Email");
  })
  .mouseout(function () {
    $("#link-text").html("我的联系方式");
  });
$("#zhihu")
  .mouseover(function () {
    $("#link-text").html("看看我的回答");
  })
  .mouseout(function () {
    $("#link-text").html("我的联系方式");
  });
$("#yuque")
  .mouseover(function () {
    $("#link-text").html("看看我的文章");
  })
  .mouseout(function () {
    $("#link-text").html("我的联系方式");
  });
$("#telegram")
  .mouseover(function () {
    $("#link-text").html("你懂的 ~");
  })
  .mouseout(function () {
    $("#link-text").html("我的联系方式");
  });
$("#twitter")
  .mouseover(function () {
    $("#link-text").html("你懂的 ~");
  })
  .mouseout(function () {
    $("#link-text").html("我的联系方式");
  });

//更多页面切换
var shoemore = false;
$("#switchmore").on("click", function () {
  shoemore = !shoemore;
  if (shoemore && $(document).width() >= 990) {
    $("#container").attr("class", "container mores");
    $("#change").html("Oops&nbsp;!");
    $("#change1").html("哎呀呀，这都被你发现了（ 再点击一次可关闭 ）");
  } else {
    $("#container").attr("class", "container");
    $("#change").html("Hello&nbsp;World&nbsp;!");
    $("#change1").html("一个基于兴趣建立的网站，或许会一直存在下去。");
  }
});

//更多页面关闭按钮
$("#close").on("click", function () {
  $("#switchmore").click();
});

//移动端菜单栏切换
var switchmenu = false;
$("#switchmenu").on("click", function () {
  switchmenu = !switchmenu;
  if (switchmenu) {
    $("#row").attr("class", "row menus");
    $("#menu").html("<i class='iconfont icon-cuowu'></i>");
  } else {
    $("#row").attr("class", "row");
    $("#menu").html("<i class='iconfont icon-liebiao'>");
  }
});

//更多弹窗页面
$("#openmore").on("click", function () {
  $("#box").css("display", "block");
  $("#row").css("display", "none");
  $("#more").css("cssText", "display:none !important");
});
$("#closemore").on("click", function () {
  $("#box").css("display", "none");
  $("#row").css("display", "flex");
  $("#more").css("display", "flex");
});

//监听网页宽度
window.addEventListener("load", function () {
  window.addEventListener("resize", function () {
    //关闭移动端样式
    if (window.innerWidth >= 600) {
      $("#row").attr("class", "row");
      $("#menu").html("<i class='iconfont icon-liebiao'>");
      //移除移动端切换功能区
      $("#rightone").attr("class", "row rightone");
    }

    if (window.innerWidth <= 990) {
      //移动端隐藏更多页面
      $("#container").attr("class", "container");
      $("#change").html("Hello&nbsp;World&nbsp;!");
      $("#change1").html("一个基于兴趣建立的网站，或许会一直存在下去。");

      //移动端隐藏弹窗页面
      $("#box").css("display", "none");
      $("#row").css("display", "flex");
      $("#more").css("display", "flex");
    }
  });
});

//移动端切换功能区
var changemore = false;
$("#changemore").on("click", function () {
  changemore = !changemore;
  if (changemore) {
    $("#rightone").attr("class", "row menus mobile");
  } else {
    $("#rightone").attr("class", "row menus");
  }
});

//更多页面显示关闭按钮
$("#more").hover(
  function () {
    $("#close").css("display", "block");
  },
  function () {
    $("#close").css("display", "none");
  }
);

//屏蔽右键
document.oncontextmenu = function () {
  iziToast.show({
    timeout: 2000,
    iconUrl: "./img/warn.png",
    message: "为了浏览体验，本站禁用右键",
  });
  return false;
};

//自动变灰
var myDate = new Date();
var mon = myDate.getMonth() + 1;
var date = myDate.getDate();
var days = ["4.4", "5.12", "7.7", "9.9", "9.18", "12.13"];
for (var day of days) {
  var d = day.split(".");
  if (mon == d[0] && date == d[1]) {
    document.write(
      "<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>"
    );
    $("#change").html("Silence&nbsp;in&nbsp;silence");
    $("#change1").html("今天是中国国家纪念日，全站已切换为黑白模式");
    window.addEventListener(
      "load",
      function () {
        iziToast.show({
          timeout: 14000,
          iconUrl: "./img/candle.png",
          message: "今天是中国国家纪念日",
        });
      },
      false
    );
  }
}

//控制台输出
var styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`;
var styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`;
var styleContent = `
color: rgb(30,152,255);
`;
var title1 = "無名の主页";
var title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ /
  | | | |\\/| |\\___ \\  \\   /    \\   /
 _| |_| |  | |____) |  | |      | |
|_____|_|  |_|_____/   |_|      |_|
`;
var content = `
版 本 号：1.6
更新日期：2022-01-30

更新说明：
1. 新增 音乐播放器支持音量控制
2. 修复 CDN 加载缓慢
3. 优化 部分动画及细节
4. 优化 页面加载缓慢
5. 优化 音乐列表延迟加载

主页:  https://www.imsyy.top
Github:  https://github.com/imsyy/home
`;
console.log(
  `%c${title1} %c${title2}
%c${content}`,
  styleTitle1,
  styleTitle2,
  styleContent
);

const ap = new APlayer({
    container: document.getElementById('aplayer'),
    order: 'random',
    preload: 'auto',
    listMaxHeight: '336px',
    volume: '0.5',
    mutex: true,
    lrcType: 3,
    /* 下方更改为你自己的歌单就行 */
    audio: [{
            name: "夜曲",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%9C%E6%9B%B2.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%9C%E6%9B%B2.lrc",
            theme: "#171513"
        },
        {
            name: "断了的弦",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%96%AD%E4%BA%86%E7%9A%84%E5%BC%A6.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001BGzMs369FzU_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%96%AD%E4%BA%86%E7%9A%84%E5%BC%A6.lrc",
            theme: "#0057a7"
        },
        {
            name: "发如雪",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8F%91%E5%A6%82%E9%9B%AA.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8F%91%E5%A6%82%E9%9B%AA.lrc",
            theme: "#171513"
        },
        {
            name: "稻香",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%A8%BB%E9%A6%99.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%A8%BB%E9%A6%99.lrc",
            theme: "#e3ae55"
        },
        {
            name: "七里香",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%83%E9%87%8C%E9%A6%99.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003DFRzD192KKD_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%83%E9%87%8C%E9%A6%99.lrc",
            theme: "#395732"
        },
        {
            name: "晴天",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%99%B4%E5%A4%A9.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%99%B4%E5%A4%A9.lrc",
            theme: "#08362e"
        },
        {
            name: "以父之名",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%BB%A5%E7%88%B6%E4%B9%8B%E5%90%8D.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%BB%A5%E7%88%B6%E4%B9%8B%E5%90%8D.lrc",
            theme: "#08362e"
        },
        {
            name: "本草纲目",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9C%AC%E8%8D%89%E7%BA%B2%E7%9B%AE.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9C%AC%E8%8D%89%E7%BA%B2%E7%9B%AE.lrc",
            theme: "#171513"
        },
        {
            name: "一路向北",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002MAeob3zLXwZ_2.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E4%B8%80%E8%B7%AF%E5%90%91%E5%8C%97.lrc",
            theme: "#383a37"
        },
        {
            name: "半岛铁盒",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8D%8A%E5%B2%9B%E9%93%81%E7%9B%92.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000004MGitN0zEHpb_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%8D%8A%E5%B2%9B%E9%93%81%E7%9B%92.lrc",
            theme: "#f0a059"
        },
        {
            name: "简单爱",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%AE%80%E5%8D%95%E7%88%B1.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000I5jJB3blWeN_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%AE%80%E5%8D%95%E7%88%B1.lrc",
            theme: "#c21c0f"
        },
        {
            name: "青花瓷",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9D%92%E8%8A%B1%E7%93%B7.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002eFUFm2XYZ7z_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9D%92%E8%8A%B1%E7%93%B7.lrc",
            theme: "#000000"
        },
        {
            name: "烟花易冷",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%83%9F%E8%8A%B1%E6%98%93%E5%86%B7.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000bviBl4FjTpO_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E7%83%9F%E8%8A%B1%E6%98%93%E5%86%B7.lrc",
            theme: "#86b5bb"
        },
        {
            name: "霍元甲",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9C%8D%E5%85%83%E7%94%B2.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000OixvE1YjIqd_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E9%9C%8D%E5%85%83%E7%94%B2.lrc",
            theme: "#295249"
        },
        {
            name: "兰亭序",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%85%B0%E4%BA%AD%E5%BA%8F.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002Neh8l0uciQZ_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%85%B0%E4%BA%AD%E5%BA%8F.lrc",
            theme: "#e3ae55"
        },
        {
            name: "枫",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9E%AB.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%9E%AB.lrc",
            theme: "#171513"
        },
        {
            name: "断了的弦",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%96%AD%E4%BA%86%E7%9A%84%E5%BC%A6.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001BGzMs369FzU_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E6%96%AD%E4%BA%86%E7%9A%84%E5%BC%A6.lrc",
            theme: "#0057a7"
        },
        {
            name: "天涯过客",
            artist: "周杰伦",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%A9%E6%B6%AF%E8%BF%87%E5%AE%A2.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001uqejs3d6EID_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6-%E5%A4%A9%E6%B6%AF%E8%BF%87%E5%AE%A2.lrc",
            theme: "#b88e16"
        },
        {
            name: "千里之外",
            artist: "周杰伦 / 费玉清",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E8%B4%B9%E7%8E%89%E6%B8%85-%E5%8D%83%E9%87%8C%E4%B9%8B%E5%A4%96.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002jLGWe16Tf1H_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E8%B4%B9%E7%8E%89%E6%B8%85-%E5%8D%83%E9%87%8C%E4%B9%8B%E5%A4%96.lrc",
            theme: "#171513"
        },
        {
            name: "珊瑚海",
            artist: "周杰伦 / 梁心颐",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E6%A2%81%E5%BF%83%E9%A2%90-%E7%8F%8A%E7%91%9A%E6%B5%B7.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000024bjiL2aocxT_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E5%91%A8%E6%9D%B0%E4%BC%A6%26%E6%A2%81%E5%BF%83%E9%A2%90-%E7%8F%8A%E7%91%9A%E6%B5%B7.lrc",
            theme: "#181714"
        },
        {
            name: "单车",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%95%E8%BD%A6.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000004S8YQr3UmEbG_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%95%E8%BD%A6.lrc",
            theme: "#32201f"
        },
        {
            name: "孤勇者",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E9%99%88%E5%A5%95%E8%BF%85-%E5%AD%A4%E5%8B%87%E8%80%85.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001uaPM93kxk1R_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%AD%A4%E5%8B%87%E8%80%85.lrc",
            theme: "#131915"
        },
        {
            name: "浮夸",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E9%99%88%E5%A5%95%E8%BF%85-%E6%B5%AE%E5%A4%B8.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003J6fvc0bVJon_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E6%B5%AE%E5%A4%B8.lrc",
            theme: "#040402"
        },
        {
            name: "十年",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%81%E5%B9%B4.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003J6fvc0bVJon_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E5%8D%81%E5%B9%B4.lrc",
            theme: "#040402"
        },
        {
            name: "一丝不挂",
            artist: "陈奕迅",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E9%99%88%E5%A5%95%E8%BF%85-%E4%B8%80%E4%B8%9D%E4%B8%8D%E6%8C%82.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001sjRhH0wqa4Q_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E9%99%88%E5%A5%95%E8%BF%85-%E4%B8%80%E4%B8%9D%E4%B8%8D%E6%8C%82.lrc",
            theme: "#0d0d0d"
        },
        {
            name: "麻雀",
            artist: "李荣浩",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E9%BA%BB%E9%9B%80.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000003P3ByD1n8nBK_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E9%BA%BB%E9%9B%80.lrc",
            theme: "#849fbd"
        },
        {
            name: "老街",
            artist: "李荣浩",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E8%80%81%E8%A1%97.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001LP8hk0a6pOp_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E8%80%81%E8%A1%97.lrc",
            theme: "#e0d7bb"
        },
        {
            name: "年少有为",
            artist: "李荣浩",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E4%B8%BA.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000000RLvtE1eDyOs_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E5%B9%B4%E5%B0%91%E6%9C%89%E4%B8%BA.lrc",
            theme: "#d2ddd5"
        },
        {
            name: "爸爸妈妈",
            artist: "李荣浩",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E7%88%B8%E7%88%B8%E5%A6%88%E5%A6%88.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001fi1zG0EjU2u_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E6%9D%8E%E8%8D%A3%E6%B5%A9-%E7%88%B8%E7%88%B8%E5%A6%88%E5%A6%88.lrc",
            theme: "#aec3ce"
        },
        {
            name: "干杯",
            artist: "五月天",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%B9%B2%E6%9D%AF.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000001fbipy4azgKM_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%B9%B2%E6%9D%AF.lrc",
            theme: "#0f1e32"
        },
        {
            name: "倔强",
            artist: "五月天",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%80%94%E5%BC%BA.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000006MmDz4Hl2Ud_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%80%94%E5%BC%BA.lrc",
            theme: "#b3dae1"
        },
        {
            name: "知足",
            artist: "五月天",
            url: "https://drive.imsyy.top/api/raw/?path=/音乐/文件引用/五月天-知足.mp3",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000020I7sO0ayXhN_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E7%9F%A5%E8%B6%B3.lrc",
            theme: "#0a0708"
        },
        {
            name: "如烟",
            artist: "五月天",
            url: "https://drive.imsyy.top/api/raw/?path=/音乐/文件引用/五月天-如烟.mp3",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000020I7sO0ayXhN_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E4%BA%94%E6%9C%88%E5%A4%A9-%E5%A6%82%E7%83%9F.lrc",
            theme: "#0a0708"
        },
        {
            name: "叹服",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E5%8F%B9%E6%9C%8D.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002CJON012PxwU_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E5%8F%B9%E6%9C%8D.lrc",
            theme: "#def3fc"
        },
        {
            name: "幻听",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E5%B9%BB%E5%90%AC.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000004RbL3b0BDIe2_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E5%B9%BB%E5%90%AC.lrc",
            theme: "#bf1c21"
        },
        {
            name: "庐州月",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E5%BA%90%E5%B7%9E%E6%9C%88.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002CJON012PxwU_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E5%BA%90%E5%B7%9E%E6%9C%88.lrc",
            theme: "#def3fc"
        },
        {
            name: "断桥残雪",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E6%96%AD%E6%A1%A5%E6%AE%8B%E9%9B%AA.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000001jmC6x1RMfh0_2.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E6%96%AD%E6%A1%A5%E6%AE%8B%E9%9B%AA.lrc",
            theme: "#1a1b14"
        },
        {
            name: "有何不可",
            artist: "许嵩",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9-%E6%9C%89%E4%BD%95%E4%B8%8D%E5%8F%AF.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002KSDg90IaScI_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9-%E6%9C%89%E4%BD%95%E4%B8%8D%E5%8F%AF.lrc",
            theme: "#edbe76"
        },
        {
            name: "温泉",
            artist: "许嵩 / 刘美麟",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9%26%E5%88%98%E7%BE%8E%E9%BA%9F-%E6%B8%A9%E6%B3%89.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000vKMVO0srdMF_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9%26%E5%88%98%E7%BE%8E%E9%BA%9F-%E6%B8%A9%E6%B3%89.lrc",
            theme: "#e3b58b"
        },
        {
            name: "素颜",
            artist: "许嵩 / 何曼婷",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E8%AE%B8%E5%B5%A9%26%E4%BD%95%E6%9B%BC%E5%A9%B7-%E7%B4%A0%E9%A2%9C.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M0000035f8nw11cjkf_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E8%AE%B8%E5%B5%A9%26%E4%BD%95%E6%9B%BC%E5%A9%B7-%E7%B4%A0%E9%A2%9C.lrc",
            theme: "#622931"
        },
        {
            name: "打上花火",
            artist: "米津玄师 / daoko",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88%26daoko-%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002rLPlR0CXaWS_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88%26daoko-%E6%89%93%E4%B8%8A%E8%8A%B1%E7%81%AB.lrc",
            theme: "#ed1306"
        },
        {
            name: "Lemon",
            artist: "米津玄师",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88-Lemon.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000nPoD43Dybcc_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88-Lemon.lrc",
            theme: "#20778f"
        },
        {
            name: "LOSER",
            artist: "米津玄师",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88-LOSER.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002kl9Hs4WaKFO_3.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2F%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%88-LOSER.lrc",
            theme: "#13141d"
        },
        {
            name: "Numb",
            artist: "Linkin Park",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2FLinkin%20Park-Numb.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000C4MQU17Phga_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FLinkin%20Park-Numb.lrc",
            theme: "#0d0d0d"
        },
        {
            name: "In The End",
            artist: "Linkin Park",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2FLinkin%20Park-In%20The%20End.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000004ImTxE1OkGqR_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FLinkin%20Park-In%20The%20End.lrc",
            theme: "#270408"
        },
        {
            name: "My Love",
            artist: "Westlife",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/Westlife-My%20Love.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000000vux3D1vZI0u_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FWestlife-My%20Love.lrc",
            theme: "#e88ba6"
        },
        {
            name: "Victory",
            artist: "Two Steps From Hell / Thomas Bergersen",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/Two%20Steps%20From%20Hell%26Thomas%20Bergersen-Victory.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002hKKCC1LSc8y_2.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FTwo%20Steps%20From%20Hell%26Thomas%20Bergersen-Victory.lrc",
            theme: "#0a0c1b"
        },
        {
            name: "Star Sky",
            artist: "Two Steps From Hell / Thomas Bergersen",
            url: "https://drive.imsyy.top/api?path=/%E9%9F%B3%E4%B9%90/%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8/Two%20Steps%20From%20Hell%26Thomas%20Bergersen-Star%20Sky.mp3&raw=true",
            cover: "https://y.qq.com/music/photo_new/T002R300x300M000002hKKCC1LSc8y_2.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FTwo%20Steps%20From%20Hell%26Thomas%20Bergersen-Star%20Sky.lrc",
            theme: "#0a0c1b"
        },
        {
            name: "Fireflies",
            artist: "Owl City",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2FOwl%20City-Fireflies.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002FEF7L03Cv7T_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FOwl%20City-Fireflies.lrc",
            theme: "#33658d"
        },
        {
            name: "The Saltwater Room",
            artist: "Owl City",
            url: "https://drive.imsyy.top/api?path=%2F%E9%9F%B3%E4%B9%90%2F%E6%96%87%E4%BB%B6%E5%BC%95%E7%94%A8%2FOwl%20City-The%20Saltwater%20Room.mp3&raw=true",
            cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002FEF7L03Cv7T_1.jpg?max_age=2592000",
            lrc: "https://s-sh-2127-music.oss.dogecdn.com/lrc%2FOwl%20City-The%20Saltwater%20Room.lrc",
            theme: "#33658d"
        }
    ]
});

/* 底栏歌词 */
setInterval(function () {
    $("#lrc").html("<span class='lrc-show'><i class='iconfont icon-yinle1'></i> " + $(".aplayer-lrc-current").text() + " <i class='iconfont icon-yinle1'></i></span>");
}, 500);

/* 音乐通知及控制 */
ap.on('play', function () {
    music = $(".aplayer-title").text() + $(".aplayer-author").text();
    iziToast.info({
        timeout: 8000,
        iconUrl: './img/music.png',
        displayMode: 'replace',
        message: music
    });
    $("#play").html("<i class='iconfont icon-pause2'>");
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
    if ($(document).width() >= 990) {
        $('.power').css("cssText", "display:none");
        $('#lrc').css("cssText", "display:block !important");
    }
});

ap.on('pause', function () {
    $("#play").html("<i class='iconfont icon-play-copy'>");
    if ($(document).width() >= 990) {
        $('#lrc').css("cssText", "display:none !important");
        $('.power').css("cssText", "display:block");
    }
});

//音量调节
function changevolume() {
    var x = $("#volume").val();
    ap.volume(x, true);
    if (x == 0) {
        $("#volume-ico").html("<span class='icon-volume-mute2'></span>");
    } else if (x > 0 && x <= 0.3) {
        $("#volume-ico").html("<span class='icon-volume-low'></span>");
    } else if (x > 0.3 && x <= 0.6) {
        $("#volume-ico").html("<span class='icon-volume-medium'></span>");
    } else {
        $("#volume-ico").html("<span class='icon-volume-high'></span>");
    }
}

$("#music").hover(function () {
    $('.music-text').css("display", "none");
    $('.music-volume').css("display", "flex");
}, function () {
    $('.music-text').css("display", "block");
    $('.music-volume').css("display", "none");
})

/* 一言与音乐切换 */
$('#open-music').on('click', function () {
    $('#hitokoto').css("display", "none");
    $('#music').css("display", "flex");
});

$("#hitokoto").hover(function () {
    $('#open-music').css("display", "flex");
}, function () {
    $('#open-music').css("display", "none");
})

$('#music-close').on('click', function () {
    $('#music').css("display", "none");
    $('#hitokoto').css("display", "flex");
});

/* 上下曲 */
$('#play').on('click', function () {
    ap.toggle();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

$('#last').on('click', function () {
    ap.skipBack();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

$('#next').on('click', function () {
    ap.skipForward();
    $("#music-name").html($(".aplayer-title").text() + $(".aplayer-author").text());
});

/* 打开音乐列表 */
$('#music-open').on('click', function () {
    if ($(document).width() >= 990) {
        $('#box').css("display", "block");
        $('#row').css("display", "none");
        $('#more').css("cssText", "display:none !important");
    }
});
function init_life_time() {
    function getAsideLifeTime() {
        /* 当前时间戳 */
        let nowDate = +new Date();
        /* 今天开始时间戳 */
        let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
        /* 今天已经过去的时间 */
        let todayPassHours = (nowDate - todayStartDate) / 1000 / 60 / 60;
        /* 今天已经过去的时间比 */
        let todayPassHoursPercent = (todayPassHours / 24) * 100;
        $('#dayProgress .date-text span').html(parseInt(todayPassHours));
        $('#dayProgress .progress .progress-bar').css('width', parseInt(todayPassHoursPercent) + '%');
        $('#dayProgress .progress .progress-bar').html(parseInt(todayPassHoursPercent) + '%');
        /* 当前周几 */
        let weeks = {
            0: 7,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6
        };
        let weekDay = weeks[new Date().getDay()];
        let weekDayPassPercent = (weekDay / 7) * 100;
        $('#weekProgress .date-text span').html(weekDay);
        $('#weekProgress .progress .progress-bar').css('width', parseInt(weekDayPassPercent) + '%');
        $('#weekProgress .progress .progress-bar').html(parseInt(weekDayPassPercent) + '%');
        /* 月 */
        let year = new Date().getFullYear();
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let monthAll = new Date(year, month, 0).getDate();
        let monthPassPercent = (date / monthAll) * 100;
        $('#monthProgress .date-text span').html(date);
        $('#monthProgress .progress .progress-bar').css('width', parseInt(monthPassPercent) + '%');
        $('#monthProgress .progress .progress-bar').html(parseInt(monthPassPercent) + '%');
        /* 年 */
        let yearPass = (month / 12) * 100;
        $('#yearProgress .date-text span').html(month);
        $('#yearProgress .progress .progress-bar').css('width', parseInt(yearPass) + '%');
        $('#yearProgress .progress .progress-bar').html(parseInt(yearPass) + '%');
    }
    getAsideLifeTime();
    setInterval(() => {
        getAsideLifeTime();
    }, 1000);
}
init_life_time()

now = new Date(), hour = now.getHours()
if (hour < 6) {
    var hello = "凌晨了";
} else if (hour < 9) {
    var hello = "早上好";
} else if (hour < 12) {
    var hello = "上午好";
} else if (hour < 14) {
    var hello = "中午好";
} else if (hour < 17) {
    var hello = "下午好";
} else if (hour < 19) {
    var hello = "傍晚了";
} else if (hour < 22) {
    var hello = "晚上好";
} else {
    var hello = "夜深了";
}