class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        this.drawRectangle({x:100, y:100}, {x:700, y:400}, [255,0,0,255],ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        this.drawCircle({x:400, y:300},100, [192,192,192,255],ctx);
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        this.drawBezierCurve({x:100,y:150},{x:350,y:250},{x:500,y:50},{x:650,y:150},[255,215,0,255],ctx);
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        //T
        this.drawLine({x:100,y:170},{x:100,y:400},[148,0,211,255],ctx);
        this.drawLine({x:25,y:400},{x:175,y:400},[148,0,211,255],ctx);
        //e
        this.drawBezierCurve({x:120,y:250},{x:120,y:300},{x:180,y:300},{x:180,y:250},[75,0,130,255],ctx);
        this.drawLine({x:120,y:250},{x:180,y:250},[75,0,130,255],ctx);
        this.drawBezierCurve({x:180,y:175},{x:120,y:150},{x:115,y:200},{x:120,y:250},[75,0,130,255],ctx);
        //r
       this.drawBezierCurve({x:210,y:280},{x:270,y:320},{x:280,y:280},{x:280,y:290},[0,0,255,255],ctx);
       this.drawCircle({x:200,y:280},10,[0,0,255,255],ctx);
       this.drawCircle({x:200,y:260},10,[0,0,255,255],ctx);
       this.drawCircle({x:200,y:240},10,[0,0,255,255],ctx);
       this.drawCircle({x:200,y:220},10,[0,0,255,255],ctx);
       this.drawCircle({x:200,y:200},10,[0,0,255,255],ctx);
       this.drawCircle({x:200,y:180},10,[0,0,255,255],ctx);
       //e
       this.drawBezierCurve({x:280,y:250},{x:280,y:300},{x:340,y:300},{x:340,y:250},[0,255,0,255],ctx);
       this.drawLine({x:280,y:250},{x:340,y:250},[0,255,0,255],ctx);
       this.drawBezierCurve({x:340,y:175},{x:280,y:150},{x:275,y:200},{x:280,y:250},[0,255,0,255],ctx);
       //n
       this.drawRectangle({x:360,y:170},{x:370,y:300},[255,255,0,255],ctx);
       this.drawBezierCurve({x:370,y:250},{x:370,y:300},{x:440,y:300},{x:440,y:250},[255,255,0,255],ctx);
       this.drawLine({x:440,y:250},{x:440,y:170},[255,255,0,255],ctx);
       //c
       this.drawBezierCurve({x:500,y:170},{x:440,y:170},{x:440,y:280},{x:500,y:280},[255,127,0,255],ctx);
       //e
       this.drawBezierCurve({x:520,y:250},{x:520,y:300},{x:580,y:300},{x:580,y:250},[255,0,0,255],ctx);
       this.drawLine({x:520,y:250},{x:580,y:250},[255,0,0,255],ctx);
       this.drawBezierCurve({x:580,y:175},{x:520,y:150},{x:515,y:200},{x:520,y:250},[255,0,0,255],ctx);
    }


    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let right_bottom= {x:right_top.x,y:left_bottom.y};
        let left_top = {x:left_bottom.x,y:right_top.y};
        this.drawLine(right_top, left_top, color, ctx);
        this.drawLine(left_bottom, right_bottom, color, ctx);
        this.drawLine(right_bottom, right_top, color, ctx);
        this.drawLine(left_bottom, left_top, color, ctx);
       if(this.show_points){

           this.drawPoints(right_bottom,[255,0,0,255],ctx);
           this.drawPoints(left_bottom,[255,0,0,255],ctx);
           this.drawPoints(left_top,[255,0,0,255],ctx);
           this.drawPoints(right_top,[255,0,0,255],ctx);
       }
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {

        let theta = 0.0;
        let point_start = {x:center.x+radius,y:center.y};
        let newPoint = {x:0,y:0};
        console.log(point_start);

        if(this.num_curve_sections>2){

           theta = Math.PI*2/this.num_curve_sections;
           let thetaInt = theta;

            for(let i = 0; i<this.num_curve_sections;++i){

                newPoint.x= center.x+radius*Math.cos(theta);
                newPoint.y= center.y+radius*Math.sin(theta);
                theta = theta+thetaInt;
                this.drawLine(point_start,newPoint,color,ctx);
                point_start = {x:newPoint.x,y:newPoint.y};
                
                if(this.show_points){

                    this.drawPoints(point_start,[255,0,0,255],ctx);
                
                    this.drawPoints(newPoint,[255,0,0,255],ctx);
                   
                }

                


            }
        }


    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let start_point={x:pt0.x,y:pt0.y};
        let end_point={x:0,y:0};
        let t =0.0;
        let t_int = 1/this.num_curve_sections;

            for(let i=0;i<=this.num_curve_sections; ++i)
            {
                    end_point.x = Math.pow((1-t),3)*pt0.x+3*Math.pow((1-t),2)*t*pt1.x+3*(1-t)*Math.pow(t,2)*pt2.x+Math.pow(t,3)*pt3.x;
                    end_point.y = Math.pow((1-t),3)*pt0.y+3*Math.pow((1-t),2)*t*pt1.y+3*(1-t)*Math.pow(t,2)*pt2.y+Math.pow(t,3)*pt3.y;
                    this.drawLine(start_point,end_point,color,ctx);
                    start_point = {x:end_point.x,y:end_point.y};
                t = t+t_int;
        
                if(this.show_points){

                    this.drawPoints(start_point,[255,0,0,255],ctx);
                    this.drawPoints(end_point,[255,0,0,255],ctx);
                    this.drawPoints(pt1,[255,0,0,255],ctx);
                    this.drawPoints(pt2,[0,255,0,255],ctx);
                }
            }
        
        
       

    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
    drawPoints(pt0,color,ctx){
        this.drawLine({x:pt0.x-1,y:pt0.y+1},{x:pt0.x+1,y:pt0.y+1},color,ctx);
    }
};
