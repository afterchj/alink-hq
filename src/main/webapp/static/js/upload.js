function DragImgUpload(id, options) {
    this.me = $(id);
    var defaultOpt = {
        boxWidth: '135px',
        boxHeight: '135px'
    }
    this.preview = $('#preview');
    this.reset = $('<div id="delete-img" style="">×</div>')
    this.preview.append(this.reset);
    this.opts = $.extend(true, defaultOpt, {}, options);
    this.init();
    this.callback = this.opts.callback;
}
//定义原型方法
DragImgUpload.prototype = {
    init: function () {
        this.me.append(this.preview);
        this.me.append(this.fileupload);
        this.eventClickInit();
        this.resetImage();
        this.cssInit();
    },
    cssInit: function () {
        this.me.css({
            'width': this.opts.boxWidth,
            'height': this.opts.boxHeight,
            'border': '1px solid #ddd',
            'display': 'inline-block',
            'transition': 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
            'border-radius': '2px',
            'box-shadow': 'inset 0 1px 1px rgba(0, 0, 0, .075)',
            'cursor': 'pointer',
            'position': 'relative'
        })
        this.preview.css({
            'height': '100%',
            'overflow': 'hidden',
        })
        this.reset.css({
            'line-height': '20px',
            'z-index': '999',
            'background': 'rgba(0,0,0,.4)',
            'color': '#fff',
            'position': 'absolute',
            'top': '0',
            'right': '0',
            'height': '25px',
            'width': '30px',
            'border-bottom-left-radius': '92%',
            'text-align': 'center',
            'font-size': '20px',
            'display': 'none'
        })

    },
    onDragover: function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    },
    onDrop: function (e) {
        var self = this;
        e.stopPropagation();
        e.preventDefault();
        var fileList = e.dataTransfer.files;
        if (fileList.length == 0) {
            return false;
        }
        //检测文件是不是图片
        if (fileList[0].type.indexOf('image') === -1) {
            alert("您拖的不是图片！");
            return false;
        }
        //拖拉图片到浏览器，可以实现预览功能
        var img = window.URL.createObjectURL(fileList[0]);
        var filename = fileList[0].name; //图片名称
        var filesize = Math.floor((fileList[0].size) / 1024);
        if (filesize > 500) {
            alert("上传大小不能超过500K.");
            return false;
        }

        self.me.find("img").attr("src", img);
        self.me.find("img").attr("title", filename);
        if (this.callback) {
            this.callback(fileList);
        }

    },
    eventClickInit: function () {
        var self = this;
        self.reset.css({
            'display': 'block'
        })
        this.me.unbind().click(function () {
            self.createImageUploadDialog();
        })
        var dp = this.me[0];
        dp.addEventListener('dragover', function (e) {
            self.onDragover(e);
        });
        dp.addEventListener("drop", function (e) {
            self.onDrop(e);
        });

    },
    onChangeUploadFile: function () {
        var self = this;
        var fileInput = this.fileInput;
        var files = fileInput.files;
        var file = files[0];
        var img = window.URL.createObjectURL(file);
        var filename = file.name;
        this.me.find("img").attr("src", img);
        this.me.find("img").attr("title", filename);
        self.reset.css({
            'display': 'block'
        })
        if (this.callback) {
            this.callback(files);
        }
    },
    createImageUploadDialog: function () {
        var self = this;
        var fileInput = this.fileInput;
        if (!fileInput) {
            //创建临时input元素
            fileInput = document.getElementById('file');
            // fileInput = document.createElement('input');
            //设置input type为文件类型
            // fileInput.type = 'file';
            //设置文件name
            // fileInput.name = 'file';
            //允许上传多个文件
            fileInput.multiple = true;
            fileInput.onchange = this.onChangeUploadFile.bind(this);
            this.fileInput = fileInput;
            self.reset.css({
                'display': 'block'
            })
        }
        //触发点击input点击事件，弹出选择文件对话框
        fileInput.click();
    },
    resetImage: function () {
        var self = this;
        this.reset.click(function (e) {
            e.stopPropagation();
            var imgReset = self.me.find("img")[0];
            console.log('图片', imgReset.src);
            imgReset.src = '/alink-hq/static/img/upload.png';
            self.reset.css({
                'display': 'none'
            })
        })
    }
}
