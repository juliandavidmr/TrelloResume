// pages/about.js
import Router from 'next/router'

export default () => (
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
    
    <div className="animated fadeIn wrapper">
      <div className="animated tada" onClick={() => Router.push('/')}>Inicio</div>
      <div className="roles">
        <div>
          I am a web developer.
      </div>

        <div>
          I am a game creator.
      </div>

        <div>          
          <img src="https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png" alt="" height="70px"/>
          <br/>
      </div>

        <div>
          I am an aspiring individual.
      </div>
      </div>
    </div>    

    <canvas id="canvas"></canvas>    

    <style jsx>{`
      
      body {
        background: #f1f1f1;
        color: #222;
        font-family: 'Open Sans', sans-serif;
      }

      .wrapper {
        padding: 155px;
        width: 500px;
        display: block;
        text-align: center;
        margin: 0 auto;
      }

      .roles {
          font-size: 30px;
          height: 50px;
          vertical-align: middle;
          overflow: hidden;
      }

      .roles div {
          height: 50px;
          transition: margin-top 1s ease-in-out;
      }
    `}</style>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="/static/animation.about.js"></script>
  </div>
)