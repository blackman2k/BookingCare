import clsx from "clsx"
import styles from "./Footer.module.scss"

function Footer() {
    return (
        <footer className={clsx(styles.footerContainer)}>
            <div className={clsx(styles.footerWrapper,"container")}>
                <p>&copy; 2021 Trần Hữu Cảnh</p>
            </div>
        </footer>
    )
}

export default Footer