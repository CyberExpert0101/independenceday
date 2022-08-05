function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const TILT_MAX_ANGLE_X = 35;
const TILT_MAX_ANGLE_Y = 35;
const AUTORESET_ON_LEAVE = true;

class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "wrapperEl",
    null);_defineProperty(this, "width",
    null);_defineProperty(this, "height",
    null);_defineProperty(this, "left",
    null);_defineProperty(this, "top",
    null);_defineProperty(this, "clientPosition",
    {
      x: 0,
      y: 0,
      xPercentage: 0,
      yPercentage: 0 });_defineProperty(this, "tiltAngleX",

    0);_defineProperty(this, "tiltAngleY",
    0);_defineProperty(this, "updateAnimationId",
    null);_defineProperty(this, "onEnter",


















    event => {
      this.wrapperEl.style.willChange = 'transform';
      this.setTransition();
    });_defineProperty(this, "onMove",

    event => {
      if (this.updateAnimationId) {
        cancelAnimationFrame(this.updateAnimationId);
      }
      this.processInput(event);
      this.update(event.type);
      this.updateAnimationId = requestAnimationFrame(this.renderFrame);
    });_defineProperty(this, "onLeave",

    event => {
      this.setTransition();

      const autoResetEvent = new CustomEvent('autoreset');
      this.onMove(autoResetEvent);
    });_defineProperty(this, "processInput",

    event => {
      switch (event.type) {
        case 'mousemove':
          this.clientPosition.x = event.clientX;
          this.clientPosition.y = event.clientY;
          break;
        case 'touchmove':
          this.clientPosition.x = event.touches[0].pageX;
          this.clientPosition.y = event.touches[0].pageY;
          break;
        case 'deviceorientation':
          this.processInputDeviceOrientation(event);
          break;
        case 'autoreset':
          if (AUTORESET_ON_LEAVE) {
            this.tiltAngleX = 0;
            this.tiltAngleY = 0;
          }
          break;}

    });_defineProperty(this, "processInputDeviceOrientation",

    event => {
      if (!event.gamma || !event.beta) {
        return;
      }

      const angleX = event.beta; // motion of the device around the x axis in degree in the range:[-180,180]
      const angleY = event.gamma; // motion of the device around the y axis in degree in the range:[-90,90]

      this.clientPosition.xPercentage = angleX / TILT_MAX_ANGLE_X * 100;
      this.clientPosition.yPercentage = angleY / TILT_MAX_ANGLE_Y * 100;
    });_defineProperty(this, "update",

    eventType => {
      if (eventType === 'autoreset') {
        return;
      }

      if (eventType !== 'deviceorientation') {
        const { x, y } = this.clientPosition;
        // calculate client x/y position
        this.clientPosition.xPercentage = (y - this.top) / this.height * 200 - 100;
        this.clientPosition.yPercentage = (x - this.left) / this.width * 200 - 100;
      }
      // set range [-100,100]
      this.clientPosition.xPercentage = Math.min(Math.max(this.clientPosition.xPercentage, -100), 100);
      this.clientPosition.yPercentage = Math.min(Math.max(this.clientPosition.yPercentage, -100), 100);
      // Calculate tilt angle x/y
      this.tiltAngleX = this.clientPosition.xPercentage * TILT_MAX_ANGLE_X / 100;
      this.tiltAngleY = -(this.clientPosition.yPercentage * TILT_MAX_ANGLE_Y / 100);
    });_defineProperty(this, "renderFrame",

    () => {
      this.wrapperEl.style.transform = `perspective(1000px) rotateX(${this.tiltAngleX}deg) rotateY(${this.tiltAngleY}deg) scale3d(1.2,1.2,1.2)`;
    });_defineProperty(this, "setTransition",

    () => {
      const duration = 1800;
      this.wrapperEl.style.transition = `all ${duration}ms cubic-bezier(.03,.98,.52,.99)`;
      this.transitionTimeoutId = setTimeout(() => {
        this.wrapperEl.style.transition = '';
      }, duration);
    });}componentDidMount() {this.setSizeAndPosition();window.addEventListener('deviceorientation', this.onMove);}componentWillUnmount() {window.removeEventListener('deviceorientation', this.onMove);}setSizeAndPosition() {const rect = this.wrapperEl.getBoundingClientRect();this.width = this.wrapperEl.offsetWidth;this.height = this.wrapperEl.offsetHeight;this.left = rect.left;this.top = rect.top;}

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "parallax-tilt-effect",
        ref: el => this.wrapperEl = el,
        onMouseEnter: this.onEnter,
        onMouseMove: this.onMove,
        onMouseLeave: this.onLeave,
        onTouchMove: this.onMove,
        onTouchStart: this.onEnter,
        onTouchEnd: this.onLeave }, /*#__PURE__*/
      React.createElement("div", { className: "inner-element" }, /*#__PURE__*/
      React.createElement("div", null, "Developed"), /*#__PURE__*/
      React.createElement("div", null, "By"), /*#__PURE__*/
      React.createElement("div", null, "Goutam"), /*#__PURE__*/
      React.createElement("div", null, "\uD83D\uDC40"))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
    