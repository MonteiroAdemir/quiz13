import styles from '../styles/Result.module.css'
import Statistic from '../components/Statistic'
import Button from '../components/Button'
import { useRouter } from 'next/router'


export default function Result() {
    const router:any = useRouter()

    const total = + router.query.total
    const right = + router.query.right
    const percentage = Math.round((right / total) * 100)

    return (
        <div className={styles.result}>
            <h1>Final Result</h1>
            <div style={{ display: "flex" }}>
                <Statistic text="Questions" value={total} />
                <Statistic text="Right" 
                value={right}
                    backgroundColor="#0cc427"/>
                <Statistic text="Percentage" 
                value={`${percentage}%`}
                    backgroundColor="#d15115" />
            </div>
            <Button href="/" text="Start" />
        </div>
    )
}