import React from 'react';
import './App.css';
import Countdown from 'react-countdown';

const Completionist = () => (
  <div>
    <img src="peppe.jpeg" alt='peppe' className='peppe-img' />
    <h3>È ora di mangiare!!!</h3>
    <p>Se non avete ancora scelto, per il Taiwanese ormai è tardi,<br/>il cinese ci mette troppo tempo se siete in tanti, savurè non ha posto: panino al carrefour e caffè.</p>
    <h4>Peppe resta in ufficio e non rompere</h4>
  </div>
)


const App = () => {

  
  const date = React.useMemo(()=>{
    const now = new Date()
    if (now.getHours() === 13) {
      return null
    } 

    if (now.getHours() < 13) {
      now.setHours(13)
      now.setMinutes(0)
      now.setSeconds(0)
      now.setMilliseconds(0)
      return now.getTime()
    } else {
      const tomorrow = new Date(now.getTime()  + 60 * 60 * 24 * 1000)
      tomorrow.setHours(13)
      tomorrow.setMinutes(0)
      tomorrow.setSeconds(0)
      tomorrow.setMilliseconds(0)
      return tomorrow.getTime()
    }
  }, [])

  const renderer = React.useCallback(({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <div>
          <h3>Mancano ancora</h3>
          <span className='countdown'>{hours}:{minutes}:{seconds}</span>
        </div>
      );
    }
  }, [])

  const renderContent = React.useCallback(()=>{
    return date === null ? <Completionist /> : <Countdown date={date} renderer={renderer} intervalDelay={0} precision={3}/>
  }, [date, renderer])


  
  return (
    <div className="App"> 
      <div className='top-section'>
        <h1>Peppe che mangiamo oggi?</h1>
      </div>
      <div className='bottom-section'>
        {renderContent()}
      </div>
     
    </div>
  );
}

export default App;
