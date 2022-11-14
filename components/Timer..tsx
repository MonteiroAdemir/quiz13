import styles from '../styles/Timer.module.css'

import {CountdownCircleTimer} from 'react-countdown-circle-timer'


interface TimerProps{
    key: any
    duration: number
    gameOver:() => void

}
export default function Timer(props:TimerProps) {
    
    return (
        <div className={styles.timer}>
            <CountdownCircleTimer
             
             duration={props.duration}
             size={100}
             isPlaying
             onComplete={props.gameOver}
             colors={['#21e755', '#F7B801', '#db5dab', '#c72115']}
             colorsTime = {[8, 6, 3, 0, ]}>
            
            
                {({ remainingTime}) => remainingTime}
                
            </CountdownCircleTimer>
            
             
        </div>
    )
}