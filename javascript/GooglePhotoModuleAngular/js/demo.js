function pagePhotoController($scope,$http){	
    //一排幾張照片
    var LINE_PHOTO_LENGTH = 3;
    //相簿連結 https://picasaweb.google.com/data/feed/api/user/<Your Account>/album/<相簿名稱>
    var API_URL = 'https://picasaweb.google.com/data/feed/api/user/leo200149/album/foodDemo';
    //注意事項 相簿必須公開
    //title:照片檔名
    //desc:照片描述
    $scope.photos = [];
    
    $http({
        url:API_URL,
        method:'GET',
        params : {
            imgmax:720,
            alt: 'json-in-script',
            callback:'picasaCallback'
        },
        headers: {
            'Content-type': 'application/json'
        }
    }).success(function(data){		
        data = data.replace('// API callback','');
        data = data.replace('picasaCallback(','');
        data = data.replace(');','');
        data = jQuery.parseJSON(data);
        var photoRow = new Array();
        $scope.photos.push(photoRow);
        $.each(data.feed.entry, function(){
        if(photoRow.length>=LINE_PHOTO_LENGTH){
            photoRow = new Array();
            $scope.photos.push(photoRow);
        }
            photoRow.push({
            id: this.content.src,
            src: this.content.src,
            title:this.media$group.media$title.$t.replace('.jpg',''),
            desc:this.media$group.media$description.$t
            });
        });	
    }).error(function(data){
        console.log(data);
    });

    $(document).ready(function() {

        $(".fancybox-thumb").fancybox({
            prevEffect	: 'none',
            nextEffect	: 'none',
            helpers	: {
                title	: {
                    type: 'outside'
                },
                thumbs	: {
                    width	: 50,
                    height	: 50
                }
            }
        });
    });
}