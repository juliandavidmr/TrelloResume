// pages/about.js



export default () => (
  <div>    
    <div className="wrapper">
      <div className="roles">
        <div>
          I am a web developer.
      </div>

        <div>
          I am a game creator.
      </div>

        <div>
          I am a student.
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