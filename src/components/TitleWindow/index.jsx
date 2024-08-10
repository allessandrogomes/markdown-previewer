import styles from './styles.module.scss'
import { SlSizeFullscreen } from "react-icons/sl";
import { MdCloseFullscreen } from "react-icons/md"
// eslint-disable-next-line react/prop-types
export default function TitleWindow({ title, maximized, onClick }) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <button onClick={onClick}>{maximized ? <MdCloseFullscreen /> : <SlSizeFullscreen />}</button>
        </div>
    )
}