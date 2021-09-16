import React from 'react';
import wide1 from '../assets/wide1.jpg'
import wide2 from '../assets/wide2.jpg'
import wide3 from '../assets/wide3.jpg'
import wide4 from '../assets/wide4.jpg'
import portrait1 from '../assets/portrait1.jpg'
import portrait2 from '../assets/portrait2.jpg'
import portrait3 from '../assets/portrait3.jpg'
import portrait4 from '../assets/portrait4.jpg'
import $ from 'jquery'

class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [
                { stateName: "THAILAND", portrait: portrait1, wide: wide1, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ab nemo itaque quis fugit asperiores, voluptatem ratione expedita perspiciatis autem. Laborum debitis cupiditate qui adipisci obcaecati omnis reprehenderit accusamus. Officia." },
                { stateName: "BALI",  portrait: portrait2, wide: wide2, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ab nemo itaque quis fugit asperiores, voluptatem ratione expedita perspiciatis autem. Laborum debitis cupiditate qui adipisci obcaecati omnis reprehenderit accusamus. Officia." },
                { stateName: "INDONESIA",  portrait: portrait3, wide: wide3, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ab nemo itaque quis fugit asperiores, voluptatem ratione expedita perspiciatis autem. Laborum debitis cupiditate qui adipisci obcaecati omnis reprehenderit accusamus. Officia." },
                { stateName: "KERALA",  portrait: portrait4, wide: wide4, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ab nemo itaque quis fugit asperiores, voluptatem ratione expedita perspiciatis autem. Laborum debitis cupiditate qui adipisci obcaecati omnis reprehenderit accusamus. Officia." },
                { stateName: "INDONESIA",  portrait: portrait1, wide: wide3, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ab nemo itaque quis fugit asperiores, voluptatem ratione expedita perspiciatis autem. Laborum debitis cupiditate qui adipisci obcaecati omnis reprehenderit accusamus. Officia." },
                { stateName: "BALI",  portrait: portrait2, wide: wide2, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ab nemo itaque quis fugit asperiores, voluptatem ratione expedita perspiciatis autem. Laborum debitis cupiditate qui adipisci obcaecati omnis reprehenderit accusamus. Officia." },
                { stateName: "KERALA",  portrait: portrait3, wide: wide4, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ab nemo itaque quis fugit asperiores, voluptatem ratione expedita perspiciatis autem. Laborum debitis cupiditate qui adipisci obcaecati omnis reprehenderit accusamus. Officia." },
                { stateName: "THAILAND", portrait: portrait1, wide: wide1, description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat ab nemo itaque quis fugit asperiores, voluptatem ratione expedita perspiciatis autem. Laborum debitis cupiditate qui adipisci obcaecati omnis reprehenderit accusamus. Officia." },
           ],
           active: 0,
           height: {
               desc: 0,
               title: 0,
           },
           portraitsScrollPos: 0,
           titleScrollPos: 0,
           descScrollPos: 0,
        }
    }

    updateHeight(index) {
        this.setState({
            ...this.state,
            height: {
                title: $(`.title-${index}`).outerHeight(),
                desc: $(`.desc-${index}`).outerHeight(),
            }
        })
    }

    slideTo(num, direction = "RIGHT") {
        let portraits = $("#portraits"),
            titles = $("#titles"),
            descriptions = $("#descriptions"),
            scrollAmount = $($("#portraits > article")[0]).outerWidth(),
            scroll = false
        if ((direction) == "LEFT" && num >= 0) {
            this.setState({
                ...this.state,
                portraitsScrollPos: this.state.portraitsScrollPos - scrollAmount,
                titleScrollPos: this.state.titleScrollPos - this.state.height.title,
                descScrollPos: this.state.descScrollPos - this.state.height.desc,
                active: num    
            })
            scroll = true
        } else if (direction == "RIGHT" && num < this.state.list.length) {
            this.setState({
                ...this.state,
                portraitsScrollPos: this.state.portraitsScrollPos + scrollAmount,
                titleScrollPos: this.state.titleScrollPos + this.state.height.title,
                descScrollPos: this.state.descScrollPos + this.state.height.desc,
                active: num    
            })
            scroll = true
        }

        if (scroll) {
            setTimeout(() => {
                portraits.animate({ scrollLeft: (this.state.portraitsScrollPos) + "px" }, 999)
                titles.animate({ scrollTop: (this.state.titleScrollPos) + "px" }, 999)             
                descriptions.animate({ scrollTop: (this.state.descScrollPos) + "px" }, 999)                    
            }, 199)            
        }
    }

    componentDidMount() {
        this.updateHeight(this.state.active)
    }

    render(){
        return(
            <div className="w-75 h-75 shadow bg-img" style={{ backgroundImage: `url(${this.state.list[this.state.active].wide})`}}>
                <div className="row mx-0 h-100 w-100">
                    <div className="col-md-1"></div>
                    <div className="col-md-5 align-self-center">
                        <div id="titles" style={{ height: `${this.state.height.title}px` }} className="w-100  overflow-hidden">
                            {this.state.list.map((item, i) => (
                                
                                <h1 className={"py-0 my-0 opensans-bold-2 text-white display-4 title-" + i}>{  item.stateName }</h1>
                            ))}
                        </div>
                        <div id="descriptions" style={{ height: `${this.state.height.desc}px` }}  className="w-100  overflow-hidden">
                            {this.state.list.map((item, i) => (
                                <p className={"py-0 my-0 small text-white opensans-regular-1 desc-" + i}>{item.description}</p>                                    
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6 px-0 row mx-0  align-self-center">
                        <div id="portraits" className="d-flex flex-nowrap align-self-center overflow-hidden ">
                            {this.state.list.map((item, i) => (
                                <article className="col-md-5 flex-shrink-0 px-4 px-md-0">
                                    <div className="">
                                        <img src={item.portrait} alt="" width="100%" className={"shadows transition-1s " 
                                            + (i != this.state.active ? "scale-95 border-radius-5 " : "border-radius-10 scale-25 ") + 
                                            (i < this.state.active ? "opacity-25 " : null)} />
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="col-12 mt-3">
                            <button onClick={() => this.slideTo(this.state.active-1, "LEFT")} className="btn mdi mdi-chevron-left p-0 circle mr-2"></button>
                            <button onClick={() => this.slideTo(this.state.active+1, "RIGHT")} className="btn mdi mdi-chevron-right p-0 circle ml-2"></button>
                        </div>
                    </div>
                </div>
                {/* <img src={wide4} alt="" className="w-100 h-100 border-radius-10" /> */}
            </div>
        );
    }
};

export default Slider