var get = {
    byId: function (id) {
        return document.getElementById(id)
    },
    byClass: function (sClass, oParent) {
        // 返回父元素oParent内类名为sClass的元素
        var aClass = [];
        var reClass = new RegExp("(^|)"+sClass+"(|$)");
        var aElem = this.byTagName('*', oParent);
        for (var i=0; i<aElem.length; i++) {
            reClass.test(aElem[i].className) && aClass.push(aElem[i]);
        }
        // return 放在for循环中,就不能循环,执行到return直接结束,return后的console.log()也不能执行
        return aClass;
    },
    byTagName: function (elem, obj) {
        // 返回 obj 下的 名为 elem 的 tag
        return (obj || document).getElementsByTagName(elem);
    }
};

window.onload = function () {
    var navItem = document.getElementsByClassName('nav-item');
    var itemChildren = document.getElementsByClassName('item-children');
    var searchText = document.getElementsByClassName('search-text')[0];
    var searchIcon = document.getElementsByClassName('search-icon')[0];
    var imgs = document.getElementById('slider').getElementsByTagName('img');
    var controlDirection = document.getElementsByClassName('control-direction');
    var prev = document.getElementsByClassName('prev')[0];
    var next = document.getElementsByClassName('next')[0];
    var dots = document.getElementsByClassName('dot');
    var siteCategory = document.getElementById('site-category');
    var categoryList = get.byClass('category-item', siteCategory);
    var clearfix = get.byClass('clearfix', siteCategory);
    var phoneLeft = document.getElementsByClassName('phone-left')[0];
    var phone = document.getElementsByClassName('phone-content')[0];
    var phoneLi = get.byTagName('li', phone);
    var household = document.getElementById('household');
    var householdLi = household.getElementsByTagName('li');
    var tabs = document.getElementsByClassName('tabs')[0];
    var tab = tabs.getElementsByTagName('li');
    var tabContent = document.getElementsByClassName('tab-content');
    var videoContent = document.getElementsByClassName('video-content')[0];
    var videoLi = videoContent.getElementsByTagName('li');
    var videoPlay = document.getElementsByClassName('play-video');
    var modalContent = document.getElementsByClassName('modal-content');
    var modal = document.getElementById('modal');
    var closeBtn = document.getElementsByClassName('close');
    var playBtn = document.getElementsByClassName('play-btn');

    var len = imgs.length;
    var cur = 0;
    var timer, categoryTimer, oClearfix;

    for (var i=0; i<navItem.length; i++) {
        navItem[i].onmouseover = function () {
            for (var i=0; i<itemChildren.length; i++) itemChildren[i].style.display = 'none';
            var oA = get.byTagName('a', this)[0];
            oA.style.color = '#ff6b00';
            var oitemChildren = get.byClass('item-children', this)[0];
            oitemChildren.style.display = 'block';
        };
        navItem[i].onmouseout = function () {
            for (var i=0; i<itemChildren.length; i++) itemChildren[i].style.display = 'none';
            var oA = get.byTagName('a', this)[0];
            oA.style.color = '#000';
        }
    }

    searchText.onfocus = function () {
        this.style.borderColor = '#ff6b00';
        searchIcon.style.borderColor = '#ff6b00';
    };
    searchText.onblur = function () {
        this.style.borderColor = '#d7d7d7';
        searchIcon.style.borderColor = '#d7d7d7';
    };
    searchIcon.onmouseover = function () {
        this.style.backgroundColor = '#ff6b00';
    };
    searchIcon.onmouseout = function () {
        this.style.backgroundColor = '#fff';
    }

    function autoPlay() {
        cur++;
        if (cur>=len){cur = 0};
        changePic(cur);
    }
    function changePic(curIndex) {
        for (var i=0; i<len; i++) {
            imgs[i].className = 'unshow';
            dots[i].classList.remove('active');
        }
        imgs[curIndex].className = 'show';
        dots[curIndex].classList.add('active');
    }

    timer = setInterval(autoPlay, 3000);

    for (var i=0; i<controlDirection.length; i++) {
        controlDirection[i].onmouseover = function () {
            this.style.backgroundColor = 'rgba(0,0,0,0.4)'
        };
        controlDirection[i].onmouseout = function () {
            this.style.backgroundColor = '';
            timer = setInterval(autoPlay, 3000);
        }
    }

    prev.onclick = function () {
        clearInterval(timer);
        cur--;
        if (cur<=0) cur = len-1;
        changePic(cur);
    };
    next.onclick = function () {
        clearInterval(timer);
        cur++;
        if (cur>=len){cur = 0};
        changePic(cur);
    };

    for (var i=0; i<len; i++) {
        (function (j) {
            dots[j].onclick = function () {
                removeActive();
                this.classList.add('active');
                changePic(j);
                cur = j;
            }
            dots[j].onmouseover = function () {
                this.classList.add('active');
            }
            dots[j].onmouseout = function () {
                if (j != cur) this.classList.remove('active');
            }
        })(i);
    }
    function removeActive() {
        for (var i=0; i<len; i++) {
            dots[i].classList.remove('active');
        }
    }

    for (var i=0; i<categoryList.length; i++) {
        categoryList[i].onmouseover = function () {
            for (var j=0; j<clearfix.length; j++) clearfix[j].style.display = 'none';
            oClearfix = get.byClass('clearfix', this)[0];
            oClearfix.style.display = 'block';
            clearTimeout(categoryTimer);
            this.style.backgroundColor = '#ff6b00';

        }
        categoryList[i].onmouseout = function () {
            categoryTimer = setTimeout(function () {
                oClearfix.style.display = 'none';
            }, 300);
            this.style.backgroundColor = '';
        }
    }

    for (var i=0; i<phoneLi.length; i++) {
        phoneLi[i].onmouseover = function () {
            this.className = 'active';
        }
        phoneLi[i].onmouseout = function () {
            this.className = '';
        }
    }

    for (var i=0; i<householdLi.length; i++) {
        householdLi[i].index = i;
        householdLi[i].onmouseover = function () {
            this.classList.add('active');
        };
        householdLi[i].onmouseout = function () {
            this.classList.remove('active');
        }
    }

    for (var i=0; i<tab.length; i++) {
        tab[i].index = i;
        tab[i].onmouseover = function () {
            for (var i=0; i<tab.length; i++) {
                tab[i].classList.remove('hover');
                tabContent[i].style.display = 'none';
            }
            this.classList.add('hover');
            tabContent[this.index].style.display = 'block'
        }
        tab[i].onmouseout = function () {

        }
    }

    for (var i=0; i<videoLi.length; i++) {
        videoLi[i].onmouseover = function () {
            var playVideo = get.byClass('play-video', this)[0];
            var play = get.byTagName('span', this)[0];
            this.classList.add('active');
           playVideo.onmouseover = function () {
               play.style.backgroundColor = '#ff6700';
           };
           playVideo.onmouseout = function () {
               play.style.backgroundColor = '';
           }
        };
        videoLi[i].onmouseout = function () {
            this.classList.remove('active');
        }
    }

    for (var i=0; i<videoPlay.length; i++) {
        videoPlay[i].index = i;
        closeBtn[i].index = i;
        playBtn[i].index = i;
        videoPlay[i].onclick = function () {
            for (var j=0; j<videoPlay.length; j++) {
                modalContent[j].style.display = 'none';
            }
            modal.style.display = 'block';
            modalContent[this.index].style.display = 'block';
        };
        closeBtn[i].onclick = function () {
            modal.style.display = 'none';
            modalContent[this.index].style.display = 'none';
            stop(this.index);
        };
        playBtn[i].onclick = function () {
            this.nextElementSibling.style.display = 'block';
            this.style.display = 'none';
            this.previousElementSibling.style.display = 'none';
            play(this.index);
        }
    }

    /*
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    playBtn.onclick = function () {
        this.nextElementSibling.style.display = 'block';
        this.style.display = 'none';
        this.previousElementSibling.style.display = 'none';
        play();
    }*/
    function play(i) {
        var video = document.getElementsByTagName('video')[i];
        video.play()
    }
    function pause(i) {
        var video = document.getElementsByTagName('video')[i];
        video.pause()
    }
    function stop(i) {
        var video = document.getElementsByTagName('video')[i];
        video.pause();
        video.currentTime = 0;
    }
};