require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');


//利用自执行函数，将图片名信息转成图片URL路径信息
//let yeomanImage = require('../images/yeoman.png');
imageDatas = (function genImageURL(imageDatasArr){
  for(let i = 0, j = imageDatasArr.length;i < j;i++){
    let singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require('../images/' + singleImageData.fileName);

    imageDatasArr[i] = singleImageData;
  }

  return imageDatasArr;
})(imageDatas);


var ImgFigure = React.createClass({
  render: function(){
    return(
      <figure className="img-figure">
        <img src={this.props.data.imageURL}
              alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
});




class AppComponent extends React.Component {
  
  constructor() {
    super();
    this.Constant = {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: { //水平方向的取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: { //垂直方向
            x: [0, 0],
            topY: [0, 0]
        }
    };
     
}

  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪一张图片
   */
  rearrange(centerIndex){

  }

  componentDidMount() {
    //首先拿到舞台的大小
    let stageDom = React.findDOMNode(this.refs.stage),
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.cell(stageW / 2),
        halfStageH = Math.cell(stageH / 2); 

    //拿到一个imgFigure的大小
      let imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfImgW = Math.cell(imgW / 2),
          halfImgH = Math.cell(imgH / 2);
      //计算中心图片的位置
      this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
      }

      //计算左侧图片取值范围
      this.Constant.hPosRange.leftSecX[0] = -halfImgW;
      this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
      
      //计算左侧图片取值范围
      this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
      
      this.Constant.hPosRange.y[0] = -halfImgH;
      this.Constant.hPosRange.y[1] = stageH - halfImgH;

      //计算上测区域图片排布的取值范围
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
  
      this.Constant.vPosRange.x[0] = halfStageW - imgW;
      this.Constant.vPosRange.x[1] = halfStageW;
      let num = Math.floor(Math.random() * 10);
      this.rearrange(num);
  }
  
  render() {

    let controllerUnits = [],
        imgFigures = [];

    imageDatas.forEach(function(value){
      imgFigures.push(<ImgFigure data={value} ref={'imaFigure'+index}/>);
    });
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="cotroller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
