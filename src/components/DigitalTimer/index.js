// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerStarts: false,
    timeElapsedInSeconds: 0,
    timerLimit: 25,
    site: 'https://ajaydigitaltimr.ccbp.tech/',
  }

  startPauseTimer = () => {
    const {timerStarts, timerLimit} = this.state
    this.setState({timerStarts: !timerStarts})
    if (!timerStarts) {
      this.timerId = setInterval(() => {
        if (timerLimit > 0) {
          this.setState(prevState => ({
            timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
          }))
        }
      }, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  resetTimer = () => {
    this.setState({
      timerStarts: false,
      timeElapsedInSeconds: 0,
      timerLimit: 25,
    })
    clearInterval(this.timerId)
  }

  decreaseTimer = () =>
    this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))

  increaseTimer = () =>
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))

  render() {
    const {timerStarts, timeElapsedInSeconds, timerLimit} = this.state

    const seconds = timerLimit * 60 - timeElapsedInSeconds

    const min = Math.floor(seconds / 60)
    const sec = seconds % 60

    if (seconds === 0) {
      clearTimeout(this.timerId)
    }

    return (
      <div className="timer-bg-con">
        <h1 className="timer-heading">Digital Timer</h1>

        <div className="timer-ctrl-con">
          <div className="timer-bg-img-con">
            <div className="timer-con">
              <h1 className="time">{`${min}:${sec < 10 ? 0 : ''}${sec}`}</h1>
              <p className="timer-status">
                {timerStarts ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>

          <div className="timer-ctrl-bg-con">
            <div className="timer-btns-con">
              <button
                className="play-pause-img-con"
                type="button"
                onClick={this.startPauseTimer}
              >
                {timerStarts ? (
                  <>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="play-pause-img"
                      alt="pause icon"
                    />
                    Pause
                  </>
                ) : (
                  <>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="play-pause-img"
                      alt="play icon"
                    />
                    Start
                  </>
                )}
              </button>

              <button
                className="play-pause-img-con"
                type="button"
                onClick={this.resetTimer}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="play-pause-img"
                  alt="reset icon"
                />
                <p className="play-pause-txt">Reset</p>
              </button>
            </div>

            <p className="set-timer-txt">Set Timer Limit</p>

            <div className="inc-dec-btn-con">
              <button
                className="inc-dec-btn"
                type="button"
                disabled={timeElapsedInSeconds !== 0}
                onClick={this.decreaseTimer}
              >
                -
              </button>

              <div className="inc-dec-num">
                <p>{timerLimit}</p>
              </div>

              <button
                className="inc-dec-btn"
                type="button"
                disabled={timeElapsedInSeconds !== 0}
                onClick={this.increaseTimer}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
