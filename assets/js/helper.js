$(function(){
    $.ajaxSetup ({ 
        cache: false //關閉AJAX相應的快取 
    });
    // 註冊insite連結。
    function linkInit(){
        $('a.insite').click(function(){
            var _url = $(this).attr('href')
            $.get(_url,undefined,function(result){
                //console.log(result)
                $('#mainFrame').html(result)
            }).fail(function() {
                var _url = './template/utils/AVAsoon.html'
                $.get(_url,undefined,function(result){
                    $('#mainFrame').html(result)
                })
            });
            return false
        })
    }
    // ajax連結。包含處理AVAsoon。
    $('.scroll-noshow ul .nav-item>a.nav-link').click(function(){
        //console.log($(this).attr('href'))
        $('.scroll-noshow ul .nav-item>a.nav-link').removeClass('active')
        console.log($(this).parent())
        var _LSt = $(this).attr('LinkState')
        var _url = (_LSt === undefined) ? $(this).attr('href') : './template/utils/AVAsoon.html'
        var _url = (_LSt === 'Online') ? './template/utils/HeldOnline.html' : _url
        //console.log(_LSt + _url)
        var _x = window.matchMedia("(max-width: 991px)")
        //console.log(_x.matches)
        if(_x.matches) {
            $('#collapseNav0, #collapseNav1').collapse('hide');
        }
        $.get(_url,undefined,function(result){
            //console.log(result)
            $('#mainFrame').html(result)
                $('#AVADate').html('')
            if (_LSt !== undefined && _LSt != '' ) {
                $('#AVASoon').remove()
                $('#AVADate').html('Available on <strong>' + _LSt + '</strong>').addClass('fs-1')
            } if (_LSt === 'Online')
                $('#HOlne').html('<strong class="text-oce-d1">' + $('#cf_Alias').text() + '</strong> will be held <strong class="text-success">Online</strong>.')
            linkInit()
        }).fail(function() {
            $.get(_url,undefined,function(result){
                //console.log(result)
                $('#mainFrame').html(result)
            })
        });
        $(this).addClass('active')
        return false
    })
    // 自動收合menu
    $(window).resize(function() {
        var _x = window.matchMedia("(max-width: 991px)")
        if (_x.matches) {
            $('#collapseNav0, #collapseNav1').collapse('hide');
            $('#btnNavCollapse').removeClass('visually-hidden')
        } else {
            $('#collapseNav0, #collapseNav1').collapse('show');
            $('#btnNavCollapse').addClass('visually-hidden')
        }
    });
    window.dispatchEvent(new Event('resize'));
});