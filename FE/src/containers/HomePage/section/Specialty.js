import styles from "./Specialty.module.scss"
import Slider from "react-slick"
import clsx from "clsx";

function Specialty() {


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <button onClick={onClick} className={clsx(styles.nextArrow, styles.btnSlider)}>
                <i class="fas fa-chevron-right"></i>
            </button>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <button onClick={onClick} className={clsx(styles.prevArrow, styles.btnSlider)}>
                <i class="fas fa-chevron-left"></i>
            </button>
        );
    }

    return (
        <div className="section-specialty">
            <Slider {...settings} className="container">
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    )
}

export default Specialty